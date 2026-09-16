const BREAKPOINT = 900;
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const btn = document.querySelector('.toc-btn');
let wasSmall = innerWidth <= BREAKPOINT;
const homeMarkup = content?.innerHTML;
const initialFile = location.pathname.includes('/HTML/') ? location.pathname.split('/').pop() : 'index.html';
let currentPageFile = initialFile;

if (location.pathname.endsWith('/index.html')) {
	history.replaceState(null, '', './');
}

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

function updateMenu(file) {
	const menu = sidebar?.querySelector('.menu-frame')?.contentWindow;
	menu?.setActiveFile(file);
}

function loadPage(file, url) {
	if (file === 'index.html' && currentPageFile !== 'index.html' && window.top === window) {
		location.replace('../');
		return;
	}

	if (window.top === window && !location.pathname.endsWith('/index.html') && !location.pathname.endsWith('/')) {
		history.replaceState(null, '', '../');
	}

	currentPageFile = file;
	window.currentPageFile = file;

	if (file === 'index.html') {
		content.innerHTML = homeMarkup;
		bindHomeCards();
		updateMenu(file);
		return;
	}

	const frame = document.createElement('iframe');
	frame.className = 'content-frame';
	frame.title = file;
	frame.src = url;
	frame.addEventListener('load', () => {
		const frameDocument = frame.contentDocument;
		frameDocument?.querySelector('.topbar')?.remove();
		frameDocument?.querySelector('.sidebar')?.remove();
		frameDocument?.querySelector('.content')?.classList.add('full');
		updateMenu(file);
	});

	content.replaceChildren(frame);
}

function bindHomeCards() {
	document.querySelectorAll('.home-card').forEach((card) => {
		card.addEventListener('click', (event) => {
			event.preventDefault();
			const url = new URL(card.href, window.location.href);
			loadPage(url.pathname.split('/').pop(), url.href);
		});
	});
}

bindHomeCards();

window.currentPageFile = currentPageFile;
window.loadPage = loadPage;
