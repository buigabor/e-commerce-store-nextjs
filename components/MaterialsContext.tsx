import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from 'react';

export interface Material {
  id: string;
  name: string;
  type: string;
  price: number;
}

const initialMaterialState = {
  materials: [],
  filteredMaterials: [],
  loading: false,
  error: null,
};

interface ActionMaterials {
  type: string;
  payload: any;
}

export interface MaterialState {
  materials: Material[];
  filteredMaterials: Material[];
  loading: boolean;
  error: null | string;
}

interface ActionMaterialFilter {
  type: string;
  payload: {
    typeFilterTags: string[];
    priceFilterTags: number[];
  };
}

const MaterialStateContext = createContext<MaterialState>(initialMaterialState);
const MaterialDispatchContext = createContext<Dispatch<ActionMaterials>>(
  () => null,
);

const handleFilterMaterials = (
  state: MaterialState,
  action: ActionMaterialFilter,
) => {
  return state.materials
    .filter((material) => {
      // SHOW IF SOME FILTER IS TRUE
      if (action.payload.typeFilterTags.length === 0) {
        return true;
      }
      for (
        let index = 0;
        index < action.payload.typeFilterTags.length;
        index++
      ) {
        if (material.type.includes(action.payload.typeFilterTags[index])) {
          return true;
        }
      }
      // SHOW IF EVERY FILTER IS TRUE
      // return action.payload.typeFilterTags.every((type: string) => {
      //   return material.type.includes(type);
      // });
    })
    .filter((material) => {
      return (
        material.price >= action.payload.priceFilterTags[0] &&
        material.price <= action.payload.priceFilterTags[1]
      );
    });
};

const materialsReducer: Reducer<MaterialState, ActionMaterials> = (
  state: MaterialState,
  action: ActionMaterials,
) => {
  switch (action.type) {
    case 'SET_MATERIALS':
      console.log('set');

      return { ...state, materials: [...action.payload] };
    case 'FILTER':
      return {
        ...state,
        filteredMaterials: handleFilterMaterials(state, action),
      };
    case 'SEARCH':
      return {
        ...state,
        filteredMaterials: state.materials.filter((material) => {
          if (
            material.name.toLowerCase().includes(action.payload.toLowerCase())
          ) {
            return true;
          }
          return false;
        }),
      };
    default:
      return state;
  }
};

const MaterialProvider: React.FC = ({ children }) => {
  const [materials, dispatchMaterials] = useReducer(
    materialsReducer,
    initialMaterialState,
  );
  return (
    <MaterialStateContext.Provider value={materials}>
      <MaterialDispatchContext.Provider value={dispatchMaterials}>
        {children};
      </MaterialDispatchContext.Provider>
    </MaterialStateContext.Provider>
  );
};

export default MaterialProvider;
export const useMaterials = () => useContext(MaterialStateContext);
export const useDispatchMaterials = () => useContext(MaterialDispatchContext);
