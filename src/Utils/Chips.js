import nanoid from 'nanoid';

const _chips = [
  { __typename: 'Chip', label: 'Flat', bgColor: '#FF5349', id: nanoid() },
  { __typename: 'Chip', label: 'Jump', bgColor: '#FF8833', id: nanoid() },
  { __typename: 'Chip', label: 'Turn Out', bgColor: '#63B76C', id: nanoid() },
  {
    __typename: 'Chip',
    label: 'Water Treadmill',
    bgColor: '#00CCCC',
    id: nanoid()
  },
  { __typename: 'Chip', label: 'Hand Walk', bgColor: '#FBE870', id: nanoid() },
  { __typename: 'Chip', label: 'Bath', bgColor: '#8C90C8', id: nanoid() }
];

const Chips = _chips.map(chip => {
  chip.idOG = chip.id;
  return chip;
});

export default Chips;
