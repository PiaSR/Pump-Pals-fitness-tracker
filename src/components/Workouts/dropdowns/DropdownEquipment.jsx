import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useExercise } from '/src/contexts//workoutContexts/exerciseContext';

export default function DropdownMuscleGroups({equipment, setEquipment}) {
  // const { fetchExercisesByEquipment, loading, error } = useExercise();

  const equipmentGroups = [
    "Barbell",
    "Dumbbell",
    "Body Only",
    "Cable",
    "Machine",
    "Kettlebells",
    "Bands",
    "Medicine Ball",
    "Exercise Ball",
    "Foam Roll",
	"E-Z Curl Bar",
	"Other"
  ];

  const handleSelect = (equipment) => {
    setEquipment(equipment.toLowerCase());
   
    
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex min-w-full  justify-center rounded-full bg-white px-3 py-2  text-sm font-normal text-dark-grey shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-gray-700" >
          <span>{equipment.split(" ").map((word) => {
            return word.charAt(0).toUpperCase()+ word.slice(1)
          }).join(" ") || "Equipment"}</span>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-current bg-inherit hover:bg-inherit" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div className="py-1">
          {equipmentGroups.map((equipment, index) => (
             // eslint-disable-next-line
            <MenuItem key={index}>
              {({ active }) => (
                
                <button
                  onClick={() => handleSelect(equipment)}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    active ? 'bg-bg-whitegrey text-black' : 'text-dark-grey'
                  }`}
                >
                  {equipment}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
