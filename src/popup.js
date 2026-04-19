function render() {
  chrome.storage.local.get(["alarms"], (res) => {
    const list = res.alarms || [];
    const box = document.getElementById("list");
    box.innerHTML = "";

    list.forEach((a) => {
      const div = document.createElement("div");

      const text = document.createElement("span");
      text.innerText = a.minutes + " min ";

      const btn = document.createElement("button");
      btn.innerText = "Delete";

      btn.onclick = () => {
        chrome.storage.local.get(["alarms"], (res2) => {
          let arr = res2.alarms || [];
          arr = arr.filter((x) => x.id !== a.id);

          chrome.storage.local.set({ alarms: arr }, () => {
            chrome.alarms.clear(a.id);
            render();
          });
        });
      };

      div.appendChild(text);
      div.appendChild(btn);
      box.appendChild(div);
    });
  });
}

document.getElementById("set").addEventListener("click", () => {
  const m = parseFloat(document.getElementById("minutes").value);
  if (isNaN(m) || m <= 0) return;

  chrome.storage.local.get(["alarms"], (res) => {
    const list = res.alarms || [];

    const alarm = {
      id: Date.now().toString(),
      minutes: m,
      repeat: "none",
      enabled: true
    };

    list.push(alarm);

    chrome.storage.local.set({ alarms: list }, () => {
      chrome.alarms.create(alarm.id, {
        delayInMinutes: m
      });

      render(); // ⭐新增关键
    });
  });
});
