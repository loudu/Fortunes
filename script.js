// Taux de pauvreté monétaire (Insee, seuil à 60 % du niveau de vie médian)
const poverty = [
  { year: "2017", value: 14.1 },
  { year: "2018", value: 14.8 },
  { year: "2019", value: 14.6 },
  { year: "2020*", value: 14.4 },
  { year: "2021", value: 14.5 },
  { year: "2022", value: 14.4 },
  { year: "2023", value: 15.4 },
];

const chart = document.getElementById("poverty-chart");
const min = 13; // base de l'axe pour rendre les écarts lisibles
const max = Math.max(...poverty.map((d) => d.value));

poverty.forEach((d) => {
  const bar = document.createElement("div");
  bar.className = "bar" + (d.value === max ? " bar--max" : "");
  bar.innerHTML = `
    <span class="bar__value">${d.value.toLocaleString("fr-FR")} %</span>
    <div class="bar__fill" data-h="${((d.value - min) / (max - min)) * 85 + 10}"></div>
    <span class="bar__year">${d.year}</span>`;
  chart.appendChild(bar);
});

const grow = () =>
  chart.querySelectorAll(".bar__fill").forEach((el) => (el.style.height = el.dataset.h + "%"));

// Apparition progressive des sections et animation du graphique
const reveal = document.querySelectorAll(".block");
if ("IntersectionObserver" in window) {
  reveal.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visible");
        if (e.target.contains(chart)) grow();
        io.unobserve(e.target);
      });
    },
    { threshold: 0.15 }
  );
  reveal.forEach((el) => io.observe(el));
} else {
  grow();
}
