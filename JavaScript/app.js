const BREAKPOINT = 900;
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const btn = document.querySelector('.toc-btn');
let wasSmall = innerWidth <= BREAKPOINT;

function desktopDefault() {
	sidebar.classList.remove('hidden', 'mobile-open');
	content.classList.remove('full');
}

function smallDefault() {
	sidebar.classList.remove('mobile-open');
	sidebar.classList.add('hidden');
	content.classList.add('full');
}

function sync() {
	const small = innerWidth <= BREAKPOINT;

	if (small !== wasSmall) {
		if (small) {
			smallDefault();
		} else {
			desktopDefault();
		}

		wasSmall = small;
	}
}

btn?.addEventListener('click', () => {
	if (innerWidth <= BREAKPOINT) {
		const open = sidebar.classList.toggle('mobile-open');
		sidebar.classList.toggle('hidden', !open);
		content.classList.add('full');
	} else {
		const hidden = sidebar.classList.toggle('hidden');
		content.classList.toggle('full', hidden);
	}
});

addEventListener('resize', sync);
