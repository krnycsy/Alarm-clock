let audio = null;
let stopped = false;

function playLoop(text, audioSrc) {
  if (stopped) return;

  if (audioSrc) {
    audio = new Audio(audioSrc);
    audio.play();
    audio.onended = () => setTimeout(() => playLoop(text, audioSrc), 1000);
  } else if (text && text.trim() !== "") {
    const u = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(u);
    u.onend = () => setTimeout(() => playLoop(text, audioSrc), 1000);
  }
}

document.getElementById("stop").onclick = () => {
  stopped = true;
  speechSynthesis.cancel();
  if (audio) audio.pause();
  window.close();
};

chrome.storage.local.get(["currentAlarm"], (res) => {
  const a = res.currentAlarm;
  if (!a) return;

  document.getElementById("msg").innerText = a.text || "时间到了";
  playLoop(a.text, a.audio);
});