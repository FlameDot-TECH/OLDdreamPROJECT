// 自动滚动相关变量
const scrollWrapper = document.getElementById('fluid-scroll');
const photoList = document.getElementById('fluid-list');
let scrollSpeed = 0.6; // 调整为更平滑的速度
let isPaused = false;
let rafId = null;
let userScrolling = false;
let userScrollTimer = null;

// 鼠标悬停时暂停，移走时继续滚动
scrollWrapper.addEventListener('mouseenter', () => {
	isPaused = true;
});
scrollWrapper.addEventListener('mouseleave', () => {
	isPaused = false;
	if (!rafId) scrollPhotos();
});

// 用户手动滚动时，暂停自动滚动
scrollWrapper.addEventListener('scroll', () => {
	userScrolling = true;
	isPaused = true;
	if (userScrollTimer) clearTimeout(userScrollTimer);
	userScrollTimer = setTimeout(() => {
		userScrolling = false;
		isPaused = false;
	}, 1200); // 1.2秒后恢复自动滚动
});



// 页面隐藏时停止动画，节省资源
document.addEventListener('visibilitychange', function() {
	if (document.hidden) {
		cancelAnimationFrame(rafId);
		rafId = null;
	} else if (!rafId) {
		scrollPhotos();
	}
});

// 阻止图片点击冒泡到document
document.querySelectorAll('.fluid-photo').forEach(photo => {
	photo.addEventListener('click', function(e) {
		e.stopPropagation();
	});
});