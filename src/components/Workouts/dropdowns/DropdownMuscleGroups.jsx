import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';


export default function DropdownMuscleGroups({muscleGroup,setMuscleGroup}) {
 

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
    <div>
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="max-h-[36px] inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-normal text-dark-grey shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-gray-700 overflow-hidden" >
        <span className="hidden sm:block text-ellipsis">{muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1) || "Muscle Groups"}</span>
        <span className="block sm:hidden text-ellipsis">{muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1) || "Muscles"}</span>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-current bg-inherit hover:bg-inherit" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        // absolute right-0 z-10 origin-top-right 
        className="absolute w-full mt-2  rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div className="py-1">
          {muscleGroups.map((muscle, index) => (
             
            <MenuItem key={index}>
              {({ active }) => (
                
                <button
                  onClick={() => handleSelect(muscle)}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    active ? 'bg-gray-200 text-black' : 'text-dark-grey'
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
