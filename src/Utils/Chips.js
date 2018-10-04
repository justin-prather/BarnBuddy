import nanoid from "nanoid";

const _chips = [
  { label: "Flat", bgColor: "#FF5349", id: nanoid() },
  { label: "Jump", bgColor: "#FF8833", id: nanoid() },
  { label: "Turn Out", bgColor: "#63B76C", id: nanoid() },
  { label: "Water Treadmill", bgColor: "#00CCCC", id: nanoid() },
  { label: "Hand Walk", bgColor: "#FBE870", id: nanoid() },
  { label: "Bath", bgColor: "#8C90C8", id: nanoid() }
];

const Chips = _chips.map(chip => {
  chip.idOG = chip.id;
  return chip;
});

export default Chips;
