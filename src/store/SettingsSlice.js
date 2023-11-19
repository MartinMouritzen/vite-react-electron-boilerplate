export const createSettingsSlice = (set, get) => ({
	theme: window.matchMedia("(prefers-color-scheme: light)").matches ? 'Light' : 'Dark',
	setTheme: (themeName) => {
		set({
			theme: themeName
		});
	},
	username: false,
	generateUsername: () => {
		const adjectives = ['Amazing', 'Brave', 'Clever', 'Fierce', 'Friendly', 'Heroic', 'Loyal', 'Smart', 'Swift', 'Awesome', 'Incredible', 'Courageous', 'Kind', 'Energetic', 'Generous', 'Passionate', 'Talented', 'Radiant', 'Glorious', 'Dazzling', 'Vibrant', 'Enchanting', 'Exuberant', 'Gallant', 'Harmonious', 'Resilient', 'Victorious', 'Wondrous', 'Zealous'];
		const animals = ['Bear', 'Buffalo', 'Cat', 'Cow', 'Deer', 'Dog', 'Eagle', 'Elephant', 'Fox', 'Giraffe', 'Goat', 'Gorilla', 'Hippo', 'Horse', 'Koala', 'Lion', 'Monkey', 'Panda', 'Pig', 'Rabbit', 'Rhino', 'Snake', 'Walrus'];

		const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
		const noun = animals[Math.floor(Math.random() * animals.length)];

		set({
			username: adjective + ' ' + noun
		});
	}
});