chrome.alarms.onAlarm.addListener(() => {
  chrome.notifications.create({
    type: "basic",
    title: "Alarm",
    message: "Time is up!",
    priority: 2
  });
});
