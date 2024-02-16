import { Button } from "./components/ui/button";
import useSeatSelection, { Seat } from "./hooks/use-seat-selection";

const initialSeats: Seat[] = [
  {
    id: "1",
    label: "A1",
    status: "available",
    row: 1,
    column: 1,
    indexFromLeft: 1,
  },
  {
    id: "2",
    label: "A2",
    status: "locked",
    row: 1,
    column: 1,
    indexFromLeft: 2,
  },
  {
    id: "3",
    label: "A3",
    status: "locked",
    row: 1,
    column: 2,
    indexFromLeft: 1,
  },
  {
    id: "4",
    label: "A4",
    status: "available",
    row: 1,
    column: 2,
    indexFromLeft: 2,
  },
  {
    id: "5",
    label: "A5",
    status: "available",
    row: 2,
    column: 1,
    indexFromLeft: 1,
  },
  {
    id: "6",
    label: "A6",
    status: "available",
    row: 2,
    column: 1,
    indexFromLeft: 2,
  },
  {
    id: "7",
    label: "A7",
    status: "available",
    row: 2,
    column: 2,
    indexFromLeft: 1,
  },
  {
    id: "8",
    label: "A8",
    status: "available",
    row: 2,
    column: 2,
    indexFromLeft: 2,
  },
  {
    id: "9",
    label: "A9",
    status: "available",
    row: 3,
    column: 1,
    indexFromLeft: 1,
  },
  {
    id: "10",
    label: "A10",
    status: "locked",
    row: 3,
    column: 1,
    indexFromLeft: 2,
  },
  {
    id: "11",
    label: "A11",
    status: "notAvailable",
    row: 3,
    column: 2,
    indexFromLeft: 1,
  },
  {
    id: "12",
    label: "A12",
    status: "available",
    row: 3,
    column: 2,
    indexFromLeft: 2,
  },
  {
    id: "13",
    label: "A13",
    status: "available",
    row: 4,
    column: 1,
    indexFromLeft: 1,
  },
  {
    id: "14",
    label: "A14",
    status: "notAvailable",
    row: 4,
    column: 1,
    indexFromLeft: 2,
  },
  {
    id: "15",
    label: "A15",
    status: "notAvailable",
    row: 4,
    column: 2,
    indexFromLeft: 1,
  },
  {
    id: "16",
    label: "A16",
    status: "available",
    row: 4,
    column: 2,
    indexFromLeft: 2,
  },
];

function IndividualSeat({
  seat,
  toggleSeat,
  selectedSeats,
}: {
  seat: Seat;
  toggleSeat: (seatId: string) => void;
  selectedSeats: string[];
}) {
  const isCurrentSelected = selectedSeats.includes(seat.id);
  return (
    <li key={seat.id}>
      <Button
        disabled={seat.status !== "available"}
        variant={isCurrentSelected ? "default" : "outline"}
        size="icon"
        type="button"
        onClick={() => toggleSeat(seat.id)}
      >
        {seat.label}
      </Button>
    </li>
  );
}

function App() {
  const seats = useSeatSelection(initialSeats);
  console.log(seats.sortedAllSeats);

  return (
    <div className="container mx-auto pt-12">
      <h1>Seat Selection</h1>
      <h2>Available Seats</h2>
      <div className="overflow-scroll space-y-2">
        {seats.sortedAllSeats.map((row, index) => (
          <div key={index} className="flex gap-8">
            {row.map((column, index) => (
              <ul key={index} className="flex gap-2">
                {column.map((seat) => (
                  <IndividualSeat
                    seat={seat}
                    toggleSeat={seats.toggleSeat}
                    selectedSeats={seats.selectedSeats}
                  />
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
      <h2>Selected Seats</h2>
      <ul>
        {seats.selectedSeats.map((seatId) => (
          <li key={seatId}>{seatId}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
