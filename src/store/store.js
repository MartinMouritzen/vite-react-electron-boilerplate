import localForage from 'localForage';
import { create } from 'zustand';

import { createSettingsSlice } from './SettingsSlice';
import { createUISlice } from './UISlice';

const useStore = create((...a) => ({
	...createSettingsSlice(...a),
	...createUISlice(...a),
	_hasHydrated: false
}));

const databaseName = 'app-name'; // Fill in your app name here.
const storeName = 'app_state';
const stateProperty = 'state';

let loadedState = false;

localForage.config({
	name: databaseName,
	storeName: storeName,
});

const loadState = async () => {
	await localForage.ready();
	try {
		var state = await localForage.getItem(stateProperty) || {};
		state = JSON.parse(state);

		loadedState = true;

		return state;
	}
	catch (error) {
		console.error('Failed to load state', error);
		throw error;
	}
};
	
const saveState = async (fullState) => {
	if (!loadedState) {
		return;
	}
	const serializableState = (state) => {
		const newState = { ...state };

		for (const key in newState) {
			if (typeof newState[key] === 'function') {
				delete newState[key];
			}
		}
		return newState;
	}
	const state = JSON.stringify(serializableState(fullState));

	try {
		await localForage.setItem(stateProperty, state);
	}
	catch (error) {
		console.error('Failed to save state', error);
		throw error;
	}
};
	
// Throttle saving to once every second
let lastSaved = 0;
const throttledSave = (state) => {
	const now = Date.now();
	if (now - lastSaved >= 1000) {
		lastSaved = now;
		saveState(state);
	}
};

// Integrate with Zustand
useStore.subscribe(
	throttledSave,
	(state) => state // This selects the whole state. Adjust if you only want to persist parts of it.
);

// On app initialization, merge loaded state with initial state
loadState()
.then((initialState) => {
	useStore.setState({
		...useStore.getState(),
		...initialState,
		_hasHydrated: true
	});
});

export default useStore;