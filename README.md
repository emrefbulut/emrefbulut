<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D1117,55:1F6FEB,100:58A6FF&height=200&section=header&text=Emre%20Bulut&fontSize=54&fontColor=FFFFFF&animation=fadeIn&fontAlignY=36&desc=Electrical%20%26%20Electronics%20Engineering%20Student&descAlignY=57&descSize=16" width="100%" alt="Emre Bulut" />

<a href="https://emrebulut.tech">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=3000&pause=800&color=1F6FEB&center=true&vCenter=true&width=700&height=45&lines=AI%2C+Deep+Learning+%26+LLMs;RF+%26+Microwave+Engineering;Machine+Learning+on+SDR+%2F+IQ+Signals;Hardware-Software+Integration" alt="Focus areas" />
</a>

<br />

<a href="https://emrebulut.tech" title="Portfolio — emrebulut.tech">
  <img height="34" src="https://img.shields.io/badge/-%231F6FEB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" />
</a>
&nbsp;
<a href="https://www.linkedin.com/in/emre-bulut-212b42200/" title="LinkedIn">
  <img height="34" src="https://img.shields.io/badge/-%230A66C2?style=for-the-badge&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIiBmaWxsPSIjRkZGRkZGIj48cGF0aCBkPSJNNDE2IDMySDMxLjlDMTQuMyAzMiAwIDQ2LjUgMCA2NC4zdjM4My40QzAgNDY1LjUgMTQuMyA0ODAgMzEuOSA0ODBINDE2YzE3LjYgMCAzMi0xNC41IDMyLTMyLjNWNjQuM2MwLTE3LjgtMTQuNC0zMi4zLTMyLTMyLjN6TTEzNS40IDQxNkg2OVYyMDIuMmg2Ni41VjQxNnptLTMzLjItMjQzYy0yMS4zIDAtMzguNS0xNy4zLTM4LjUtMzguNVM4MC45IDk2IDEwMi4yIDk2YzIxLjIgMCAzOC41IDE3LjMgMzguNSAzOC41IDAgMjEuMy0xNy4yIDM4LjUtMzguNSAzOC41em0yODIuMSAyNDNoLTY2LjRWMzEyYzAtMjQuOC0uNS01Ni43LTM0LjUtNTYuNy0zNC42IDAtMzkuOSAyNy0zOS45IDU0LjlWNDE2aC02Ni40VjIwMi4yaDYzLjd2MjkuMmguOWM4LjktMTYuOCAzMC42LTM0LjUgNjIuOS0zNC41IDY3LjIgMCA3OS43IDQ0LjMgNzkuNyAxMDEuOVY0MTZ6Ii8%2BPC9zdmc%2B" alt="LinkedIn" />
</a>
&nbsp;
<a href="mailto:emrebulutf@gmail.com" title="emrebulutf@gmail.com">
  <img height="34" src="https://img.shields.io/badge/-%23EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
</a>
&nbsp;
<a href="https://github.com/emrefbulut" title="GitHub">
  <img height="34" src="https://img.shields.io/badge/-%23181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</a>
&nbsp;
<a href="https://pypi.org/user/emre.bulut/" title="PyPI">
  <img height="34" src="https://img.shields.io/badge/-%233775A9?style=for-the-badge&logo=pypi&logoColor=white" alt="PyPI" />
</a>

<br /><br />

<img src="https://komarev.com/ghpvc/?username=emrefbulut&label=Profile%20views&color=1F6FEB&style=for-the-badge" alt="Profile views" />

</div>

---

## About me

I'm an Electrical & Electronics Engineering student at **Istanbul Medipol University**, based in Istanbul, Türkiye. My focus is bringing **AI, deep learning and LLMs** into **RF and microwave engineering** — the two halves of my degree that most people keep in separate rooms.

That intersection is where the interesting problems live. RF data is abundant, high-rate and badly served by generic ML tooling: spectrum, IQ streams and SigMF captures don't behave like images or text, and their failure modes are quiet. **IQForge**, my first published Python package, came directly out of that — it turns SDR captures into PyTorch datasets that can't silently leak between train and test.

Around that core I work on hardware–software integration, putting models on edge devices and wiring them into real electrical systems, and I bring hands-on **enterprise virtualization** (VMware vSphere) and **Red Hat Enterprise Linux** experience to how I think about reliability and system architecture.

- **AI & deep learning** — model training, fine-tuning, dataset engineering, LLMs
- **RF & microwave** — SDR/IQ signal processing, SigMF pipelines, machine learning on RF
- **Hardware–software integration** — edge deployment, embedded control, telemetry
- **Systems & infrastructure** — virtualization, Linux administration, network topology

---

## Featured Projects

<table>
<tr>
<td width="50%" valign="top">

<h3 align="center"><a href="https://github.com/emrefbulut/iqforge">IQForge</a></h3>

<p align="center">
  <a href="https://pypi.org/project/iqforge/"><img src="https://img.shields.io/pypi/v/iqforge?style=flat-square&logo=pypi&logoColor=white&label=PyPI&color=3775A9" alt="PyPI version" /></a>
  <img src="https://img.shields.io/badge/License-MIT-6E7681?style=flat-square" alt="MIT" />
</p>

<p>My first <b>published Python package</b> — <code>pip install iqforge</code>. Splitting SDR recordings at the <b>window</b> level lets neighbouring windows leak across train and test, inflating reported accuracy by up to <b>13.6 points</b>. IQForge splits at the <b>recording</b> level instead, reads SigMF directly, balances metadata that would otherwise create hidden correlations, and fails loudly rather than degrading silently when stratification is impossible.</p>

<p align="center">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch" />
<img src="https://img.shields.io/badge/SDR%20%2F%20SigMF-4C1D95?style=flat-square" alt="SDR / SigMF" />
</p>

</td>
<td width="50%" valign="top">

<h3 align="center"><a href="https://github.com/emrefbulut/RoomGate-AI">RoomGate&#8209;AI</a></h3>

<p align="center">
  <img src="https://img.shields.io/badge/Computer%20Vision-0F766E?style=flat-square" alt="Computer Vision" />
  <img src="https://img.shields.io/badge/Edge-1F6FEB?style=flat-square" alt="Edge" />
</p>

<p>A smart access and occupancy system that turns detections into physical action. An edge-optimized <b>YOLO26</b> detector with spatial region-of-interest filtering drives a relay-based lock, so the vision pipeline and the door stay in sync instead of drifting apart.</p>

<p align="center">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/YOLO26-00B0FF?style=flat-square&logoColor=white" alt="YOLO26" />
<img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white" alt="OpenCV" />
</p>

</td>
</tr>
<tr>
<td width="50%" valign="top">

<h3 align="center"><a href="https://github.com/emrefbulut/IoT-Smart-Energy-Monitor">IoT Smart Energy Monitor</a></h3>

<p align="center">
  <img src="https://img.shields.io/badge/IoT%20Telemetry-B45309?style=flat-square" alt="IoT Telemetry" />
  <img src="https://img.shields.io/badge/License-MIT-6E7681?style=flat-square" alt="MIT" />
</p>

<p>Three layers, one loop: an <b>ESP32 + PZEM&#8209;004T</b> front end for raw AC measurement, a Python bridge computing active/apparent/reactive power and cumulative kWh, and a live dashboard on top. Anomalies raise alerts, events are written asynchronously to SQLite in WAL mode, and load shedding is guarded by hysteresis and a confirmation window.</p>

<p align="center">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/ESP32-E7352C?style=flat-square&logo=espressif&logoColor=white" alt="ESP32" />
<img src="https://img.shields.io/badge/MQTT-660066?style=flat-square&logo=mqtt&logoColor=white" alt="MQTT" />
<img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite" />
</p>

</td>
<td width="50%" valign="top">

<h3 align="center"><a href="https://github.com/emrefbulut/VoltPilot">VoltPilot</a></h3>

<p align="center">
  <img src="https://img.shields.io/badge/Power%20Systems-1E40AF?style=flat-square" alt="Power Systems" />
  <img src="https://img.shields.io/badge/License-MIT-6E7681?style=flat-square" alt="MIT" />
</p>

<p>Sites planning EV charging investments rarely know in advance whether their grid connection can take the load. VoltPilot simulates it before anything is installed — transformer loading, battery dispatch, virtual grid signals, telemetry validation and generated engineering reports, so the decision rests on data instead of a guess.</p>

<p align="center">
<img src="https://img.shields.io/badge/Grid%20Simulation-0F766E?style=flat-square" alt="Grid Simulation" />
<img src="https://img.shields.io/badge/EV%20Charging-047857?style=flat-square" alt="EV Charging" />
<img src="https://img.shields.io/badge/Telemetry-6D28D9?style=flat-square" alt="Telemetry" />
</p>

</td>
</tr>
</table>

---

## Tech Stack

<div align="center">
<table>
<tr>
<td align="right" valign="middle"><b>AI &amp; Deep Learning</b></td>
<td>
<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
<img src="https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face" />
<img src="https://img.shields.io/badge/CUDA-76B900?style=for-the-badge&logo=nvidia&logoColor=white" alt="CUDA" />
<img src="https://img.shields.io/badge/YOLO-00B0FF?style=for-the-badge&logoColor=white" alt="YOLO" />
<img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV" />
</td>
</tr>
<tr>
<td align="right" valign="middle"><b>RF &amp; Signal Processing</b></td>
<td>
<img src="https://img.shields.io/badge/SDR%20%2F%20IQ-4C1D95?style=for-the-badge" alt="SDR / IQ" />
<img src="https://img.shields.io/badge/SigMF-6D28D9?style=for-the-badge" alt="SigMF" />
<img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white" alt="NumPy" />
<img src="https://img.shields.io/badge/SciPy-8CAAE6?style=for-the-badge&logo=scipy&logoColor=white" alt="SciPy" />
</td>
</tr>
<tr>
<td align="right" valign="middle"><b>Languages</b></td>
<td>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black" alt="C" />
<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
</td>
</tr>
<tr>
<td align="right" valign="middle"><b>Hardware &amp; IoT</b></td>
<td>
<img src="https://img.shields.io/badge/ESP32-E7352C?style=for-the-badge&logo=espressif&logoColor=white" alt="ESP32" />
<img src="https://img.shields.io/badge/MQTT-660066?style=for-the-badge&logo=mqtt&logoColor=white" alt="MQTT" />
<img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white" alt="Arduino" />
<img src="https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=white" alt="Raspberry Pi" />
</td>
</tr>
<tr>
<td align="right" valign="middle"><b>Systems</b></td>
<td>
<img src="https://img.shields.io/badge/VMware%20vSphere-607078?style=for-the-badge&logo=vmware&logoColor=white" alt="VMware vSphere" />
<img src="https://img.shields.io/badge/Red%20Hat%20Enterprise%20Linux-EE0000?style=for-the-badge&logo=redhat&logoColor=white" alt="Red Hat Enterprise Linux" />
<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
</td>
</tr>
<tr>
<td align="right" valign="middle"><b>Data &amp; Tooling</b></td>
<td>
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</td>
</tr>
</table>
</div>

---

## GitHub Stats

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=emrefbulut&theme=github_dark" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=emrefbulut&theme=github" alt="Profile details" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=emrefbulut&theme=github_dark" />
  <img height="200" src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=emrefbulut&theme=github" alt="Repositories per language" />
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=emrefbulut&theme=github_dark" />
  <img height="200" src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=emrefbulut&theme=github" alt="Most commit language" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=emrefbulut&theme=github_dark" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=emrefbulut&theme=github" alt="Stats" />
</picture>

<br /><br />

<img src="https://streak-stats.demolab.com?user=emrefbulut&background=00000000&ring=1F6FEB&fire=1F6FEB&currStreakNum=6E7681&sideNums=6E7681&currStreakLabel=1F6FEB&sideLabels=6E7681&dates=6E7681&hide_border=true" alt="GitHub streak" />

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:58A6FF,45:1F6FEB,100:0D1117&height=120&section=footer" width="100%" alt="" />
