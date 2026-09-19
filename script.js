const screens = {
  love: document.querySelector('#love-screen'),
  marry: document.querySelector('#marry-screen'),
  celebration: document.querySelector('#celebration-screen')
};
const show = (screen) => {
  Object.values(screens).forEach((item) => { item.hidden = item !== screen; item.classList.toggle('active', item === screen); });
  window.scrollTo(0, 0);
};

let noCount = 0;
const loveYes = document.querySelector('#love-yes');
const loveNo = document.querySelector('#love-no');
const loveHint = document.querySelector('#love-hint');
const gentleHints = ['Are you sureee? 🥺', 'The yes button is looking extra cute...', 'A little closer to yes ♡', 'Okay, I think the answer is clear now!'];

loveNo.addEventListener('click', () => {
  noCount += 1;
  const noScale = Math.max(.42, 1 - noCount * .18);
  const yesScale = Math.min(6.8, 1 + noCount * .34);
  loveNo.style.transform = `scale(${noScale})`;
  loveYes.style.transform = `scale(${yesScale})`;
  loveYes.style.zIndex = noCount > 4 ? '3' : 'auto';
  loveHint.textContent = gentleHints[Math.min(noCount - 1, gentleHints.length - 1)];
  if (noCount >= 6) {
    loveYes.classList.add('takeover');
    loveYes.style.position = 'fixed'; loveYes.style.inset = '0'; loveYes.style.transform = 'none'; loveYes.style.borderRadius = '0';
    loveYes.textContent = 'Yes, I do ♡'; loveNo.style.opacity = '0'; loveNo.disabled = true;
  }
});
loveYes.addEventListener('click', () => show(screens.marry));

const cat = document.querySelector('#cat-message');
const marryNo = document.querySelector('#marry-no');
document.querySelector('#marry-yes').addEventListener('click', () => show(screens.celebration));
marryNo.addEventListener('click', () => {
  cat.hidden = false; marryNo.textContent = 'Please?'; marryNo.style.transform = 'scale(.82)';
  document.querySelector('#marry-hint').textContent = 'I have a very emotional little helper…';
});
document.querySelector('#replay').addEventListener('click', () => {
  noCount = 0; loveNo.removeAttribute('style'); loveNo.disabled = false; loveYes.removeAttribute('style'); loveYes.classList.remove('takeover'); loveYes.textContent = 'Yes, I do ♡'; loveHint.textContent = 'Please say yes, alagheyyyy ♡'; cat.hidden = true; marryNo.removeAttribute('style'); marryNo.textContent = 'No'; document.querySelector('#marry-hint').textContent = 'You make every day feel like magic.'; show(screens.love);
});
