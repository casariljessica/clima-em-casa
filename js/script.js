// =====================================================
// Configurações e URLs das APIs
// =====================================================

const API_URLS = {
  geocoding: "https://geocoding-api.open-meteo.com/v1/search",
  forecast: "https://api.open-meteo.com/v1/forecast",
  archive: "https://archive-api.open-meteo.com/v1/archive",
  moonPhases: "https://aa.usno.navy.mil/api/moon/phases/date",
};

// =====================================================
// Constantes e elementos do DOM
// =====================================================

const getElement = (selector) => document.querySelector(selector);

const elements = {
  status: getElement("#status"),
  errorMessage: getElement("#errorMessage"),
  cityInput: getElement("#city"),
  weatherForm: getElement("#weatherForm"),
  searchResults: getElement("#searchResults"),
  weatherContent: getElement("#weatherContent"),
  refreshButton: getElement("#refreshButton"),
  locationName: getElement("#locationName"),
  locationMeta: getElement("#locationMeta"),
  currentIcon: getElement("#currentIcon"),
  currentPlace: getElement("#currentPlace"),
  headerLocationName: getElement("#headerLocationName"),
  headerLocationMeta: getElement("#headerLocationMeta"),
  currentTitle: getElement("#currentTitle"),
  currentUpdated: getElement("#currentUpdated"),
  currentTemperature: getElement("#currentTemperature"),
  feelsLike: getElement("#feelsLike"),
  humidity: getElement("#humidity"),
  wind: getElement("#wind"),
  precipitation: getElement("#precipitation"),
  forecastGrid: getElement("#forecastGrid"),
  fullForecastGrid: getElement("#fullForecastGrid"),
  historyGrid: getElement("#historyGrid"),
  greeting: getElement("#greeting"),
  currentDate: getElement("#currentDate"),
  temperatureRange: getElement("#temperatureRange"),
  rainChance: getElement("#rainChance"),
  sunHours: getElement("#sunHours"),
  temperatureChart: getElement("#temperatureChart"),
  precipitationChart: getElement("#precipitationChart"),
  moonIllustration: getElement("#moonIllustration"),
  moonPhaseName: getElement("#moonPhaseName"),
  moonNextPhase: getElement("#moonNextPhase"),
  moonIllumination: getElement("#moonIllumination"),
  moonPhaseOptions: getElement("#moonPhaseOptions"),
  weatherAnimation: getElement("#weatherAnimation"),
  dayDetailsModal: getElement("#dayDetailsModal"),
  detailsTitle: getElement("#detailsTitle"),
  detailsDescription: getElement("#detailsDescription"),
  detailsIcon: getElement("#detailsIcon"),
  detailsTemperature: getElement("#detailsTemperature"),
  detailsRain: getElement("#detailsRain"),
  detailsPrecipitation: getElement("#detailsPrecipitation"),
  detailsFeelsLike: getElement("#detailsFeelsLike"),
  detailsWind: getElement("#detailsWind"),
  detailsHumidity: getElement("#detailsHumidity"),
  detailsSun: getElement("#detailsSun"),
  hourlyTemperatureChart: getElement("#hourlyTemperatureChart"),
  detailsUnavailable: getElement("#detailsUnavailable"),
  themeOptions: [...document.querySelectorAll("[data-theme-option]")],
  forecastPrevious: getElement(".forecast-nav--previous"),
  forecastNext: getElement(".forecast-nav--next"),
  navigationItems: [...document.querySelectorAll(".nav-item")],
};

// =====================================================
// Estado da aplicação
// =====================================================

const applicationState = {
  location: null,
  forecast: null,
  selectedCard: null,
  moonPhases: [],
  timezone: "UTC",
};

// =====================================================
// Códigos WMO e descrições meteorológicas
// =====================================================

const WMO_WEATHER = {
  0: ["Céu limpo", "☀️"],
  1: ["Predominantemente limpo", "🌤️"],
  2: ["Parcialmente nublado", "⛅"],
  3: ["Nublado", "☁️"],
  45: ["Neblina", "🌫️"],
  48: ["Neblina", "🌫️"],
  51: ["Chuvisco leve", "🌦️"],
  53: ["Chuvisco", "🌦️"],
  55: ["Chuvisco intenso", "🌧️"],
  61: ["Chuva leve", "🌧️"],
  63: ["Chuva", "🌧️"],
  65: ["Chuva intensa", "🌧️"],
  71: ["Neve leve", "🌨️"],
  73: ["Neve", "🌨️"],
  75: ["Neve intensa", "❄️"],
  80: ["Pancadas leves", "🌦️"],
  81: ["Pancadas", "🌧️"],
  82: ["Pancadas intensas", "⛈️"],
  85: ["Pancadas de neve", "🌨️"],
  86: ["Pancadas de neve intensas", "🌨️"],
  95: ["Trovoada", "⛈️"],
  96: ["Trovoada com granizo", "⛈️"],
  99: ["Trovoada com granizo", "⛈️"],
};

function getWeatherInfo(weatherCode) {
  return WMO_WEATHER[weatherCode] || ["Condição indisponível", "🌡️"];
}

function getWeatherAnimationClass(weatherCode) {
  if ([0].includes(weatherCode)) return "weather-animation--sunny";
  if ([1, 2].includes(weatherCode)) return "weather-animation--partly-cloudy";
  if ([3].includes(weatherCode)) return "weather-animation--cloudy";
  if ([45, 48].includes(weatherCode)) return "weather-animation--fog";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode))
    return "weather-animation--snow";
  if ([95, 96, 99].includes(weatherCode)) return "weather-animation--storm";
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  ) {
    return "weather-animation--rain";
  }
  return "weather-animation--sunny";
}

function renderWeatherAnimation(weatherCode) {
  elements.weatherAnimation.className = `weather-animation ${getWeatherAnimationClass(weatherCode)}`;
  elements.weatherAnimation.innerHTML = `
    <span class="weather-orb"></span>
    <span class="weather-cloud weather-cloud--one"></span>
    <span class="weather-cloud weather-cloud--two"></span>
    <span class="weather-particles"></span>
    <span class="weather-lightning"></span>
  `;
}

// =====================================================
// Funções auxiliares e formatação
// =====================================================

function formatDate(
  date,
  options = {
    weekday: "short",
    day: "numeric",
    month: "short",
  },
) {
  return new Intl.DateTimeFormat("pt-BR", options).format(
    new Date(`${date}T12:00:00`),
  );
}

function formatCurrentDate(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function getGreeting(hour = new Date().getHours()) {
  if (hour < 12) return "Bom dia!";
  if (hour < 18) return "Boa tarde!";
  return "Boa noite!";
}

function createApiUrl(baseUrl, parameters) {
  const queryString = new URLSearchParams(parameters);
  return `${baseUrl}?${queryString}`;
}

function setStatus(message, isLoading = false) {
  elements.status.hidden = !message;

  elements.status.innerHTML = isLoading
    ? `<span class="spinner" aria-hidden="true"></span>${message}`
    : message;
}

function showError(message) {
  elements.errorMessage.textContent = message;
  elements.errorMessage.hidden = false;
}

function clearMessages() {
  elements.errorMessage.hidden = true;
  setStatus("");
}

function setActiveNavigation(sectionId) {
  elements.navigationItems.forEach((item) => {
    const isActive = item.getAttribute("href") === `#${sectionId}`;
    item.classList.toggle("is-active", isActive);

    if (isActive) {
      item.setAttribute("aria-current", "location");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function initializeNavigation() {
  const sections = ["overview", "forecast", "history", "insights"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  elements.navigationItems.forEach((item) => {
    item.addEventListener("click", () => {
      const sectionId = item.getAttribute("href").slice(1);
      setActiveNavigation(sectionId);
    });
  });

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

      if (visibleSection) {
        setActiveNavigation(visibleSection.target.id);
      }
    },
    {
      rootMargin: "-12% 0px -65% 0px",
      threshold: [0.1, 0.25, 0.5],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function initializeForecastScroller() {
  const scrollAmount = () => elements.forecastGrid.clientWidth * 0.75;

  elements.forecastPrevious.addEventListener("click", () => {
    elements.forecastGrid.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  elements.forecastNext.addEventListener("click", () => {
    elements.forecastGrid.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  elements.themeOptions.forEach((option) => {
    const isSelected = option.dataset.themeOption === theme;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
  try {
    localStorage.setItem("clima-em-casa-theme", theme);
  } catch {
    // A preferência visual continua funcionando sem armazenamento.
  }
}

function initializeTheme() {
  let savedTheme = "auto";
  try {
    savedTheme = localStorage.getItem("clima-em-casa-theme") || "auto";
  } catch {
    // Usa o modo automático quando o armazenamento está bloqueado.
  }

  applyTheme(savedTheme);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (document.documentElement.dataset.theme === "auto") {
        updateWeatherScene();
      }
    });
}

function updateWeatherScene(weatherCode = null, isDay = null) {
  const sceneClass =
    weatherCode == null
      ? ""
      : getWeatherAnimationClass(weatherCode).replace(
          "weather-animation",
          "scene",
        );
  document.body.dataset.scene = sceneClass;
  document.body.dataset.period = isDay === 0 ? "night" : "day";
}

// =====================================================
// Requisições à Open-Meteo
// =====================================================

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`A API respondeu com erro HTTP ${response.status}.`);
  }

  return response.json();
}

function getLocalDateString(timezone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function getMoonPhaseLabel(phaseName) {
  const labels = {
    "New Moon": "Lua nova",
    "First Quarter": "Quarto crescente",
    "Full Moon": "Lua cheia",
    "Last Quarter": "Quarto minguante",
  };
  return labels[phaseName] || phaseName;
}

function formatMoonDate(phase, timezone) {
  const [hours = 0, minutes = 0] = String(phase.time || "00:00")
    .split(":")
    .map(Number);
  const phaseDate = new Date(
    Date.UTC(phase.year, phase.month - 1, phase.day, hours, minutes),
  );
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: timezone,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(phaseDate);
}

function getMoonPhaseClass(phaseName) {
  return {
    "New Moon": "moon-new",
    "First Quarter": "moon-first-quarter",
    "Full Moon": "moon-full",
    "Last Quarter": "moon-last-quarter",
  }[phaseName] || "moon-new";
}

function renderMoonIllustration(phaseName) {
  elements.moonIllustration.innerHTML = `
    <svg viewBox="0 0 180 150" aria-hidden="true" class="moon-svg">
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%">
          <stop offset="0" stop-color="#9bbcff" stop-opacity=".35" />
          <stop offset="1" stop-color="#9bbcff" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="moonSurface" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fff8dc" />
          <stop offset="1" stop-color="#d9e2f3" />
        </linearGradient>
      </defs>
      <circle cx="90" cy="74" r="64" fill="url(#moonGlow)" />
      <circle cx="90" cy="74" r="39" fill="#263653" opacity=".9" />
      <circle class="moon-disc ${getMoonPhaseClass(phaseName)}" cx="90" cy="74" r="39" fill="url(#moonSurface)" />
      <circle cx="76" cy="61" r="5" fill="#b7c4d7" opacity=".5" />
      <circle cx="104" cy="86" r="7" fill="#b7c4d7" opacity=".35" />
      <circle cx="96" cy="53" r="3" fill="#b7c4d7" opacity=".45" />
    </svg>
  `;
}

function renderMoonUnavailable() {
  elements.moonPhaseName.textContent = "Dados indisponíveis";
  elements.moonNextPhase.textContent = "Não foi possível consultar as fases lunares agora.";
  elements.moonIllumination.textContent = "—";
  elements.moonIllustration.innerHTML = "";
  elements.moonPhaseOptions.innerHTML = "";
}

function renderMoonData(phases, timezone) {
  if (!phases.length) {
    renderMoonUnavailable();
    return;
  }

  const now = Date.now();
  const phaseDates = phases.map((phase) => {
    const [hours = 0, minutes = 0] = String(phase.time || "00:00")
      .split(":")
      .map(Number);

    return {
      ...phase,
      date: new Date(
        Date.UTC(phase.year, phase.month - 1, phase.day, hours, minutes),
      ),
    };
  });
  const previous = phaseDates.filter((phase) => phase.date.getTime() <= now).at(-1) || phaseDates[0];
  const next = phaseDates.find((phase) => phase.date.getTime() > now) || phaseDates.at(-1);

  elements.moonPhaseName.textContent = getMoonPhaseLabel(previous.phase);
  elements.moonNextPhase.textContent = `Próxima: ${getMoonPhaseLabel(next.phase)} · ${formatMoonDate(next, timezone)}`;
  elements.moonIllumination.textContent = previous.phase === "Full Moon" ? "100%" : previous.phase === "New Moon" ? "0%" : "—";
  elements.moonPhaseName.dataset.phase = previous.phase;
  renderMoonIllustration(previous.phase);

  const mainPhases = ["New Moon", "First Quarter", "Full Moon", "Last Quarter"];
  elements.moonPhaseOptions.innerHTML = mainPhases.map((phaseName) => {
    const occurrence = phaseDates.find((phase) => phase.phase === phaseName && phase.date.getTime() >= now) || phaseDates.find((phase) => phase.phase === phaseName);
    return `<button type="button" class="moon-phase-option ${occurrence?.phase === previous.phase ? "is-selected" : ""}" data-moon-phase="${phaseName}" ${occurrence ? "" : "disabled"}><span>${getMoonPhaseLabel(phaseName)}</span><small>${occurrence ? formatMoonDate(occurrence, timezone) : "Indisponível"}</small></button>`;
  }).join("");

  elements.moonPhaseOptions.querySelectorAll(".moon-phase-option").forEach((button) => {
    button.addEventListener("click", () => {
      const phase = phaseDates.find((item) => item.phase === button.dataset.moonPhase && item.date.getTime() >= now) || phaseDates.find((item) => item.phase === button.dataset.moonPhase);
      if (!phase) return;
      elements.moonPhaseName.textContent = getMoonPhaseLabel(phase.phase);
      elements.moonNextPhase.textContent = `Ocorrência: ${formatMoonDate(phase, timezone)}`;
      elements.moonIllumination.textContent = phase.phase === "Full Moon" ? "100%" : phase.phase === "New Moon" ? "0%" : "—";
      renderMoonIllustration(phase.phase);
      elements.moonPhaseOptions.querySelectorAll(".moon-phase-option").forEach((option) => option.classList.toggle("is-selected", option === button));
    });
  });
}

async function loadMoonData(timezone) {
  try {
    const startDate = new Date(`${getLocalDateString(timezone)}T12:00:00Z`);
    startDate.setUTCDate(startDate.getUTCDate() - 35);
    const date = startDate.toISOString().slice(0, 10);
    const url = createApiUrl(API_URLS.moonPhases, { date, nump: 10 });
    const data = await fetchJson(url);
    applicationState.moonPhases = data.phasedata || [];
    applicationState.timezone = timezone;
    renderMoonData(applicationState.moonPhases, timezone);
  } catch {
    renderMoonUnavailable();
  }
}

async function searchCities(cityName) {
  const searchUrl = createApiUrl(API_URLS.geocoding, {
    name: cityName,
    count: 10,
    language: "pt",
    format: "json",
  });

  const data = await fetchJson(searchUrl);
  return data.results || [];
}

async function loadWeather(location) {
  applicationState.location = location;

  try {
    localStorage.setItem("clima-em-casa-location", JSON.stringify(location));
  } catch {
    // O armazenamento pode estar bloqueado pelo navegador.
  }

  clearMessages();
  setStatus("Buscando os dados do céu...", true);
  elements.weatherContent.hidden = false;

  try {
    const commonParameters = {
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: "auto",
    };

    const forecastUrl = createApiUrl(API_URLS.forecast, {
      ...commonParameters,
      forecast_days: 16,
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset",
      hourly:
        "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m",
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const fiveDaysAgo = new Date(yesterday);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 4);

    const archiveUrl = createApiUrl(API_URLS.archive, {
      ...commonParameters,
      start_date: fiveDaysAgo.toISOString().slice(0, 10),
      end_date: yesterday.toISOString().slice(0, 10),
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    });

    const [forecast, history] = await Promise.all([
      fetchJson(forecastUrl),
      fetchJson(archiveUrl),
    ]);

    if (!forecast.current || !forecast.daily || !history.daily) {
      throw new Error(
        "A resposta não trouxe dados meteorológicos suficientes.",
      );
    }

    renderWeather(location, forecast, history);
    applicationState.forecast = forecast;
    setStatus("");
  } catch (error) {
    const connectionError = error.message.includes("Failed");
    const message = connectionError
      ? "Não foi possível conectar à Open-Meteo. Verifique sua internet e tente novamente."
      : error.message;

    showError(message);
    setStatus("");
  }
}

// =====================================================
// Renderização das condições atuais
// =====================================================

function renderCurrentWeather(location, forecast) {
  const currentWeather = forecast.current;
  const [description, icon] = getWeatherInfo(currentWeather.weather_code);

  elements.locationName.textContent = location.name;
  elements.headerLocationName.textContent = location.name;
  elements.headerLocationMeta.textContent = [location.admin1, location.country]
    .filter(Boolean)
    .join(" · ");
  elements.currentPlace.textContent = [location.name, location.admin1]
    .filter(Boolean)
    .join(" · ");
  elements.locationMeta.textContent = [location.admin1, location.country]
    .filter(Boolean)
    .join(" · ");

  elements.currentIcon.textContent = icon;
  renderWeatherAnimation(currentWeather.weather_code);
  updateWeatherScene(currentWeather.weather_code, currentWeather.is_day);
  elements.currentTitle.textContent = description;
  elements.currentTemperature.textContent = Math.round(
    currentWeather.temperature_2m,
  );
  elements.feelsLike.textContent = Math.round(
    currentWeather.apparent_temperature,
  );
  elements.humidity.textContent = `${currentWeather.relative_humidity_2m}%`;
  elements.wind.textContent = `${Math.round(
    currentWeather.wind_speed_10m,
  )} km/h`;
  elements.precipitation.textContent = `${Number(
    currentWeather.precipitation || 0,
  ).toFixed(1)} mm`;
  elements.currentUpdated.textContent = `Atualizado às ${currentWeather.time.slice(11, 16)} · ${forecast.timezone_abbreviation || forecast.timezone}`;
}

function renderDailyInsights(dailyData, forecast) {
  const todayProbability = dailyData.precipitation_probability_max?.[0];
  const sunrise = dailyData.sunrise?.[0]?.slice(11, 16) || "—";
  const sunset = dailyData.sunset?.[0]?.slice(11, 16) || "—";

  elements.temperatureRange.textContent = `${Math.round(dailyData.temperature_2m_max[0])}° / ${Math.round(dailyData.temperature_2m_min[0])}°`;
  elements.rainChance.textContent =
    todayProbability == null ? "—" : `${todayProbability}%`;
  elements.sunHours.parentElement.querySelector("small").textContent =
    `${sunrise} · ${sunset}`;
  elements.sunHours.textContent = forecast.current.is_day ? "Dia" : "Noite";
}

function createChartSvg(dailyData, type) {
  const isPrecipitation = type === "precipitation";
  const maximumValues = isPrecipitation
    ? dailyData.precipitation_sum.map((value) => Number(value || 0))
    : dailyData.temperature_2m_max;
  const minimumValues = isPrecipitation ? [] : dailyData.temperature_2m_min;
  const values = [...maximumValues, ...minimumValues].slice(
    0,
    isPrecipitation ? 7 : 14,
  );
  const minimum = Math.min(...values, 0);
  const maximum = Math.max(...values, 1);
  const width = 640;
  const height = 190;
  const padding = { top: 18, right: 18, bottom: 30, left: 18 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const createPoints = (series) =>
    series.slice(0, 7).map((value, index) => {
      const x = padding.left + (chartWidth / 6) * index;
      const y =
        padding.top +
        chartHeight -
        ((value - minimum) / (maximum - minimum || 1)) * chartHeight;
      return { x, y, value };
    });
  const maximumPoints = createPoints(maximumValues);
  const minimumPoints = createPoints(minimumValues);
  const line = maximumPoints.map((point) => `${point.x},${point.y}`).join(" ");
  const minimumLine = minimumPoints.length
    ? `<polyline class="chart-line chart-line--min" points="${minimumPoints.map((point) => `${point.x},${point.y}`).join(" ")}" />`
    : "";
  const labels = dailyData.time
    .slice(0, 7)
    .map(
      (date, index) =>
        `<text x="${maximumPoints[index].x}" y="178" text-anchor="middle">${formatDate(date, { weekday: "short" }).replace(".", "")}</text>`,
    )
    .join("");
  const dots = maximumPoints
    .map(
      (point) =>
        `<circle cx="${point.x}" cy="${point.y}" r="4" /><title>${point.value}${isPrecipitation ? " mm" : "°C"}</title>`,
    )
    .join("");
  const minimumDots = minimumPoints
    .map(
      (point) =>
        `<circle class="chart-dot--min" cx="${point.x}" cy="${point.y}" r="4" /><title>${point.value}°C</title>`,
    )
    .join("");

  return `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true" focusable="false"><line class="chart-axis" x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" /><polyline class="chart-line" points="${line}" />${minimumLine}${dots}${minimumDots}${labels}</svg>`;
}

function renderCharts(dailyData) {
  elements.temperatureChart.innerHTML = createChartSvg(
    dailyData,
    "temperature",
  );
  elements.precipitationChart.innerHTML = createChartSvg(
    dailyData,
    "precipitation",
  );
}

// =====================================================
// Renderização da previsão de 15 dias e histórico
// =====================================================

function createDailyCard(dailyData, index, isHistorical) {
  const [description, icon] = getWeatherInfo(dailyData.weather_code[index]);
  const probability = dailyData.precipitation_probability_max?.[index];
  const isToday = !isHistorical && index === 0;
  const precipitation = isHistorical
    ? `${Number(dailyData.precipitation_sum?.[index] || 0).toFixed(1)} mm`
    : probability == null
      ? "—"
      : `${probability}%`;

  return `
    <article class="day-card ${isHistorical ? "history-card" : ""} ${isToday ? "today-card" : ""}"
      data-day-index="${index}" data-historical="${isHistorical}" tabindex="0" role="button"
      aria-label="Ver detalhes de ${formatDate(dailyData.time[index], { day: "numeric", month: "long", year: "numeric" })}">
      <div class="day-date">
        ${formatDate(dailyData.time[index], { weekday: "short" })}
        <strong>
          ${formatDate(dailyData.time[index], { day: "numeric", month: "short" })}
        </strong>
      </div>
      <span class="day-icon" aria-hidden="true">${icon}</span>
      <strong class="day-condition">${description}</strong>
      <div class="temps">
        <b>${Math.round(dailyData.temperature_2m_max[index])}°</b>
        <span>${Math.round(dailyData.temperature_2m_min[index])}°</span>
      </div>
      <div class="rain">💧 ${precipitation}</div>
    </article>
  `;
}

function renderDailyData(targetElement, dailyData, amount, isHistorical) {
  const cards = Array.from(
    { length: Math.min(amount, dailyData.time.length) },
    (_, index) => createDailyCard(dailyData, index, isHistorical),
  );

  targetElement.innerHTML = cards.join("");

  if (!isHistorical) {
    targetElement.querySelectorAll(".day-card").forEach((card) => {
      card.addEventListener("click", () =>
        openDayDetails(Number(card.dataset.dayIndex), card),
      );
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDayDetails(Number(card.dataset.dayIndex), card);
        }
      });
    });
  }
}

function getHourlyIndexesForDate(hourlyData, date) {
  if (!hourlyData?.time) return [];
  return hourlyData.time
    .map((time, index) => (time.startsWith(date) ? index : -1))
    .filter((index) => index !== -1);
}

function createHourlyTemperatureChart(hourlyData, indexes) {
  if (!indexes.length) return "";

  const values = indexes.map((index) => hourlyData.temperature_2m[index]);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const points = indexes.map((index, pointIndex) => {
    const x = 12 + (576 / Math.max(indexes.length - 1, 1)) * pointIndex;
    const y =
      120 -
      ((hourlyData.temperature_2m[index] - minimum) /
        (maximum - minimum || 1)) *
        90;
    return {
      x,
      y,
      value: hourlyData.temperature_2m[index],
      time: hourlyData.time[index].slice(11, 16),
    };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const dots = points
    .map(
      (point) => `
    <circle cx="${point.x}" cy="${point.y}" r="3"></circle>
    <title>${point.time}: ${point.value}°C</title>
  `,
    )
    .join("");
  const labels = points
    .filter((_, index) => index % 4 === 0)
    .map(
      (point) =>
        `<text x="${point.x}" y="150" text-anchor="middle">${point.time}</text>`,
    )
    .join("");

  return `
    <svg viewBox="0 0 600 165" aria-hidden="true">
      <line class="chart-axis" x1="12" y1="120" x2="588" y2="120"></line>
      <polyline class="chart-line" points="${line}"></polyline>
      ${dots}
      ${labels}
    </svg>
  `;
}

function renderDayDetails(index, card) {
  const forecast = applicationState.forecast;
  const daily = forecast.daily;
  const date = daily.time[index];
  const [description, icon] = getWeatherInfo(daily.weather_code[index]);
  const hourlyIndexes = getHourlyIndexesForDate(forecast.hourly, date);
  const hourlyData = forecast.hourly;

  elements.detailsTitle.textContent = formatDate(date, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  elements.detailsDescription.textContent = description;
  elements.detailsIcon.textContent = icon;
  elements.detailsTemperature.textContent = `${Math.round(daily.temperature_2m_max[index])}° / ${Math.round(daily.temperature_2m_min[index])}°`;
  elements.detailsRain.textContent =
    daily.precipitation_probability_max?.[index] == null
      ? "Probabilidade indisponível"
      : `${daily.precipitation_probability_max[index]}% de chance de chuva`;
  elements.detailsPrecipitation.textContent = `${Number(daily.precipitation_sum?.[index] || 0).toFixed(1)} mm previstos`;
  elements.detailsSun.textContent = `${daily.sunrise?.[index]?.slice(11, 16) || "—"} / ${daily.sunset?.[index]?.slice(11, 16) || "—"}`;

  if (hourlyIndexes.length) {
    const apparentTemperatures = hourlyIndexes.map(
      (hourlyIndex) => hourlyData.apparent_temperature[hourlyIndex],
    );
    const windSpeeds = hourlyIndexes.map(
      (hourlyIndex) => hourlyData.wind_speed_10m[hourlyIndex],
    );
    const humidity = hourlyIndexes.map(
      (hourlyIndex) => hourlyData.relative_humidity_2m[hourlyIndex],
    );
    const middleIndex = hourlyIndexes[Math.floor(hourlyIndexes.length / 2)];

    elements.detailsFeelsLike.textContent = `${Math.round(Math.max(...apparentTemperatures))}°C`;
    elements.detailsWind.textContent = `${Math.round(Math.max(...windSpeeds))} km/h · ${hourlyData.wind_direction_10m[middleIndex]}°`;
    elements.detailsHumidity.textContent = `${Math.round(humidity.reduce((sum, value) => sum + value, 0) / humidity.length)}% média`;
    elements.hourlyTemperatureChart.innerHTML = createHourlyTemperatureChart(
      hourlyData,
      hourlyIndexes,
    );
    elements.detailsUnavailable.hidden = true;
  } else {
    elements.detailsFeelsLike.textContent = "Indisponível";
    elements.detailsWind.textContent = "Indisponível";
    elements.detailsHumidity.textContent = "Indisponível";
    elements.hourlyTemperatureChart.innerHTML = "";
    elements.detailsUnavailable.hidden = false;
  }

  document.querySelectorAll(".day-card.is-selected").forEach((dayCard) => {
    dayCard.classList.remove("is-selected");
  });
  card.classList.add("is-selected");
}

function openDayDetails(index, card) {
  if (!applicationState.forecast) return;
  applicationState.selectedCard = card;
  renderDayDetails(index, card);
  elements.dayDetailsModal.hidden = false;
  document.body.classList.add("modal-open");
  elements.dayDetailsModal.querySelector("[data-close-details]").focus();
}

function closeDayDetails() {
  elements.dayDetailsModal.hidden = true;
  document.body.classList.remove("modal-open");
  applicationState.selectedCard?.focus();
  applicationState.selectedCard?.classList.remove("is-selected");
  applicationState.selectedCard = null;
}

function renderWeather(location, forecast, history) {
  elements.greeting.textContent = getGreeting();
  elements.currentDate.textContent = formatCurrentDate();
  renderCurrentWeather(location, forecast);
  renderDailyInsights(forecast.daily, forecast);
  renderDailyData(elements.forecastGrid, forecast.daily, 7, false);
  renderDailyData(elements.fullForecastGrid, forecast.daily, 15, false);
  renderDailyData(elements.historyGrid, history.daily, 5, true);
  renderCharts(forecast.daily);
  loadMoonData(forecast.timezone || "UTC");
}

// =====================================================
// Renderização da pesquisa e tratamento de eventos
// =====================================================

function renderSearchResults(locations) {
  if (!locations.length) {
    elements.searchResults.innerHTML =
      '<p class="search-empty">Nenhuma cidade encontrada. Tente outro nome.</p>';
    return;
  }

  elements.searchResults.innerHTML = locations
    .map(
      (location, index) => `
        <button class="result-option" type="button" data-index="${index}">
          <strong>${location.name}</strong>
          <span>${[location.admin1, location.country].filter(Boolean).join(", ")}</span>
        </button>
      `,
    )
    .join("");

  elements.searchResults
    .querySelectorAll(".result-option")
    .forEach((button) => {
      button.addEventListener("click", () => {
        selectLocation(locations[button.dataset.index]);
      });
    });
}

function selectLocation(location) {
  elements.searchResults.innerHTML = "";
  elements.cityInput.value = location.name;
  loadWeather(location);
}

async function handleSearchSubmit(event) {
  event.preventDefault();

  const cityName = elements.cityInput.value.trim();
  elements.searchResults.innerHTML = "";

  if (!cityName) {
    showError("Digite o nome de uma cidade para pesquisar.");
    elements.cityInput.focus();
    return;
  }

  clearMessages();
  setStatus("Encontrando cidades...", true);

  try {
    const locations = await searchCities(cityName);
    renderSearchResults(locations);
    setStatus("");
  } catch {
    setStatus("");
    showError(
      "Não foi possível pesquisar agora. Confira sua conexão e tente novamente.",
    );
  }
}

// =====================================================
// Inicialização da aplicação
// =====================================================

elements.weatherForm.addEventListener("submit", handleSearchSubmit);

elements.refreshButton.addEventListener("click", () => {
  if (applicationState.location) {
    loadWeather(applicationState.location);
  }
});

elements.dayDetailsModal
  .querySelectorAll("[data-close-details]")
  .forEach((control) => {
    control.addEventListener("click", closeDayDetails);
  });

elements.themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyTheme(option.dataset.themeOption);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.dayDetailsModal.hidden) {
    closeDayDetails();
  }
});

try {
  const savedLocation = JSON.parse(
    localStorage.getItem("clima-em-casa-location"),
  );

  if (savedLocation?.latitude && savedLocation?.longitude) {
    loadWeather(savedLocation);
  }
} catch {
  // A aplicação continua funcionando sem a cidade salva.
}

initializeTheme();
initializeNavigation();
initializeForecastScroller();
