(function () {
  // Fecha objetivo: 17 de enero 2026, 10:00 p.m. hora local
  const targetDate = new Date("2026-01-17T22:00:00");

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMins = document.getElementById("cd-mins");
  const elSecs = document.getElementById("cd-secs");
  const elStatus = document.getElementById("countdown-status");

  function pad(n) {
    return n.toString().padStart(2, "0");
  }

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      elDays.textContent = "00";
      elHours.textContent = "00";
      elMins.textContent = "00";
      elSecs.textContent = "00";
      elStatus.textContent = "¡El evento ha comenzado!";
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
    elStatus.textContent = "";
  }

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();

  // WhatsApp
  function openWhatsApp() {
    const phone = "977198996";
    const text = encodeURIComponent(
      "Hola, confirmo mi asistencia a los 15 de Zayda Nicole."
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  }

  document
    .getElementById("btn-confirm")
    .addEventListener("click", openWhatsApp);
  document
    .getElementById("btn-confirm-top")
    .addEventListener("click", openWhatsApp);

  // Audio controls
  const audio = document.getElementById("audio");
  const btnPlay = document.getElementById("btn-play");
  const progressFill = document.getElementById("progress-fill");
  const audioTime = document.getElementById("audio-time");
  const audioDuration = document.getElementById("audio-duration");

  function formatTime(sec) {
    if (!isFinite(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${pad(m)}:${pad(s)}`;
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function updatePlayButton() {
    btnPlay.textContent = audio.paused ? "⏵" : "⏸";
  }

  audio.addEventListener("loadedmetadata", () => {
    audioDuration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    audioTime.textContent = formatTime(audio.currentTime);
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = pct + "%";
    }
  });

  audio.addEventListener("play", updatePlayButton);
  audio.addEventListener("pause", updatePlayButton);
  btnPlay.addEventListener("click", togglePlay);

  // Intento de autoplay (puede requerir interacción del usuario)
  audio.play().catch(() => {
    updatePlayButton();
  });

  // Autoplay al tocar cualquier parte (excepto botones/links)
  function shouldIgnoreTarget(target) {
    if (!target) return false;
    const interactive = target.closest("a, button");
    return Boolean(interactive);
  }

  function handleFirstInteraction(evt) {
    if (shouldIgnoreTarget(evt.target)) return;
    audio
      .play()
      .then(() => {
        updatePlayButton();
      })
      .catch(() => {
        updatePlayButton();
      });
    document.removeEventListener("pointerdown", handleFirstInteraction, true);
    document.removeEventListener("touchstart", handleFirstInteraction, true);
  }

  document.addEventListener("pointerdown", handleFirstInteraction, true);
  document.addEventListener("touchstart", handleFirstInteraction, true);
  document.addEventListener("touchend", handleFirstInteraction, true);
  document.addEventListener("click", handleFirstInteraction, true);
})();
