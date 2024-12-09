import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';


export default function DropdownMuscleGroups({setMuscleGroup}) {
 

  const muscleGroups = [
    "Abdominals",
    "Biceps",
    "Calves",
    "Chest",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Lats",
    "Lower Back",
    "Middle Back",
    "Triceps",
    "Shoulders",
    "Traps",
    "Quadriceps"
  ];

  const handleSelect = (muscle) => {
    
    setMuscleGroup(muscle.toLowerCase());
    
  };


  return (
    <div className="space-y-4">
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-bg-white px-3 py-2 text-sm font-normal text-dark-grey shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-bg-whitegrey hover:text-black" >
          Muscle Groups
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-current bg-inherit hover:bg-inherit" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div className="py-1">
          {muscleGroups.map((muscle, index) => (
             
            <MenuItem key={index}>
              {({ active }) => (
                
                <button
                  onClick={() => handleSelect(muscle)}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    active ? 'bg-bg-whitegrey text-black' : 'text-dark-grey'
                  }`}
                >
                  {muscle}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>

     
    </div>
  );
}
