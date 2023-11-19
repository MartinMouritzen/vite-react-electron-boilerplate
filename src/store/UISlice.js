export const createUISlice = (set, get) => ({
	showIntroductionModal: true,
	setShowIntroductionModal: (show) => {
		set({
			showIntroductionModal: show
		});
	}
});