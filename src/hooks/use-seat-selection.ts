import { useState } from "react";

export type Seat = {
  id: string;
  label: string;
  status: "available" | "notAvailable" | "locked";
  row: number;
  column: number;
  indexFromLeft: number;
};

function groupAndSortSeats(seats: Seat[]): Seat[][][] {
  // First, group the seats by row
  const groupedByRow = seats.reduce(
    (accumulator, seat) => {
      accumulator[seat.row] = accumulator[seat.row] || [];
      accumulator[seat.row].push(seat);
      return accumulator;
    },
    {} as Record<number, Seat[][]>,
  );

  // Now, for each row, group the seats by column
  for (const row in groupedByRow) {
    const groupedByColumn = groupedByRow[row].reduce(
      (acc, seat) => {
        acc[seat.column] = acc[seat.column] || [];
        acc[seat.column].push(seat);
        return acc;
      },
      {} as Record<number, Seat[][]>,
    );

    // Replace the array of seats with grouped by column
    groupedByRow[row] = Object.values(groupedByColumn);
  }

  // Sort seats within each row by column and indexFromLeft
  for (const row in groupedByRow) {
    groupedByRow[row].forEach((column) => {
      column.sort(
        (a, b) => a.column - b.column || a.indexFromLeft - b.indexFromLeft,
      );
    });
  }

  return Object.values(groupedByRow);
}

function useSeatSelection(initialSeats: Seat[]) {
  const [allSeats, setAllSeats] = useState<Seat[]>(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const updateSeats = (newSeats: Seat[]) => {
    setAllSeats(newSeats);

    // Check for any selected seats that are now booked
    const newSelectedSeats = selectedSeats.filter(
      (seatId) =>
        !newSeats.find(
          (seat) => seat.id === seatId && seat.status === "notAvailable",
        ),
    );

    // Alert the user if any seats were removed
    if (newSelectedSeats.length < selectedSeats.length) {
      alert(
        "Some of your selected seats have become unavailable. They have been automatically deselected.",
      );
    }

    setSelectedSeats(newSelectedSeats);
  };

  // Use an effect to listen for changes in seat data
  // useEffect(() => {
  //   const newSeatsData = getNewSeatsData(); // Replace with actual data fetching logic
  //   updateSeats(newSeatsData);
  // }, []);

  const toggleSeat = (seatId: string) => {
    const seat = allSeats.find((s) => s.id === seatId);
    if (!seat || seat.status !== "available") return; // Exit if seat is not available

    if (selectedSeats.includes(seatId)) {
      // If the seat is already selected, remove it from the array
      setSelectedSeats((prevSeats) => prevSeats.filter((id) => id !== seatId));
    } else {
      // Otherwise, add the seat to the array
      setSelectedSeats((prevSeats) => [...prevSeats, seatId]);
    }
  };

  const resetSeats = () => {
    setAllSeats(initialSeats);
    setSelectedSeats([]);
  };

  return {
    allSeats,
    sortedAllSeats: groupAndSortSeats(allSeats),
    selectedSeats,
    toggleSeat,
    resetSeats,
    updateSeats,
  };
}

export default useSeatSelection;
