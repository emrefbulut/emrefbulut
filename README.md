<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D1117,55:1F6FEB,100:58A6FF&height=200&section=header&text=Emre%20Bulut&fontSize=54&fontColor=FFFFFF&animation=fadeIn&fontAlignY=36&desc=Electrical%20%26%20Electronics%20Engineering%20Student&descAlignY=57&descSize=16" width="100%" alt="Emre Bulut" />

<a href="https://emrebulut.tech">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=3000&pause=800&color=1F6FEB&center=true&vCenter=true&width=700&height=45&lines=Computer+Vision+%26+Edge+AI;Model+Training+%26+Dataset+Engineering;Embedded+Systems+%26+IoT+Telemetry;Power+Systems+%26+Enterprise+Virtualization" alt="Focus areas" />
</a>

<br />

<a href="https://emrebulut.tech">
  <img src="https://img.shields.io/badge/Portfolio-emrebulut.tech-1F6FEB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" />
</a>
<a href="https://www.linkedin.com/in/emre-bulut-212b42200/">
  <img src="https://img.shields.io/badge/LinkedIn-Emre%20Bulut-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="mailto:emrebulutf@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-emrebulutf@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
</a>
<a href="https://github.com/emrefbulut">
  <img src="https://img.shields.io/badge/GitHub-emrefbulut-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</a>
<a href="https://pypi.org/user/emre.bulut/">
  <img src="https://img.shields.io/badge/PyPI-emre.bulut-3775A9?style=for-the-badge&logo=pypi&logoColor=white" alt="PyPI" />
</a>

<br /><br />

<img src="https://komarev.com/ghpvc/?username=emrefbulut&label=Profile%20views&color=1F6FEB&style=for-the-badge" alt="Profile views" />

</div>

---

## About me

I'm an Electrical & Electronics Engineering student at **Istanbul Medipol University**, based in Istanbul, Türkiye. My work sits where models meet hardware: training and fine-tuning **computer vision** models, optimizing them to run on **edge devices**, and wiring them into real electrical systems that have to behave correctly outside a notebook.

I care about the parts of a project that usually get skipped — how the data was split, whether a measurement is trustworthy, what the system does when a threshold is crossed at 3 a.m. Alongside the engineering side, hands-on experience with **enterprise virtualization** (VMware vSphere) and **Red Hat Enterprise Linux** administration shapes how I think about reliability and system architecture.

- **Computer vision & model training** — dataset construction, labeling, fine-tuning, edge deployment
- **Hardware–software integration** — sensor acquisition, embedded control, relay and actuator logic
- **Systems & infrastructure** — virtualization, Linux administration, network topology, telemetry pipelines

---

## Featured Projects

<table>
<tr>
<td width="50%" valign="top">

<a href="https://github.com/emrefbulut/iqforge">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=emrefbulut&repo=iqforge&bg_color=00000000&title_color=1F6FEB&text_color=6E7681&icon_color=1F6FEB&hide_border=true" alt="IQForge" />
</a>

<p>My first <b>published Python package</b>, installable from PyPI with <code>pip install iqforge</code>. Splitting SDR recordings at the <b>window</b> level lets neighbouring windows leak across train and test, inflating reported accuracy by up to <b>13.6 points</b>. IQForge splits at the <b>recording</b> level instead, reads SigMF directly, and fails loudly instead of silently degrading when stratification is impossible.</p>

<p>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch" />
<img src="https://img.shields.io/badge/SDR%20%2F%20SigMF-4C1D95?style=flat-square" alt="SDR / SigMF" />
</p>

<p>
<a href="https://pypi.org/project/iqforge/"><img src="https://img.shields.io/pypi/v/iqforge?style=for-the-badge&logo=pypi&logoColor=white&label=PyPI&color=3775A9" alt="Published on PyPI" /></a>
</p>

</td>
<td width="50%" valign="top">

<a href="https://github.com/emrefbulut/RoomGate-AI">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=emrefbulut&repo=RoomGate-AI&bg_color=00000000&title_color=1F6FEB&text_color=6E7681&icon_color=1F6FEB&hide_border=true" alt="RoomGate-AI" />
</a>

<p>A smart access and occupancy prototype that turns detections into physical action. An edge-optimized <b>YOLO26</b> detector with spatial region-of-interest filtering drives a relay-based lock, so the vision pipeline and the door actually stay in sync.</p>

<p>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/YOLO26-00B0FF?style=flat-square&logoColor=white" alt="YOLO26" />
<img src="https://img.shields.io/badge/Edge%20Computing-0F766E?style=flat-square" alt="Edge Computing" />
</p>

</td>
</tr>
<tr>
<td width="50%" valign="top">

<a href="https://github.com/emrefbulut/IoT-Smart-Energy-Monitor">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=emrefbulut&repo=IoT-Smart-Energy-Monitor&bg_color=00000000&title_color=1F6FEB&text_color=6E7681&icon_color=1F6FEB&hide_border=true" alt="IoT Smart Energy Monitor" />
</a>

<p>Three layers, one loop: an <b>ESP32 + PZEM-004T</b> front end for raw AC measurement, a Python bridge computing active/apparent/reactive power and cumulative kWh, and a live dashboard on top. Anomalies trigger alerts, and load shedding is protected by hysteresis and a confirmation window.</p>

<p>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/ESP32-E7352C?style=flat-square&logo=espressif&logoColor=white" alt="ESP32" />
<img src="https://img.shields.io/badge/MQTT-660066?style=flat-square&logo=mqtt&logoColor=white" alt="MQTT" />
<img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite" />
</p>

</td>
<td width="50%" valign="top">

<a href="https://github.com/emrefbulut/VoltPilot">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=emrefbulut&repo=VoltPilot&bg_color=00000000&title_color=1F6FEB&text_color=6E7681&icon_color=1F6FEB&hide_border=true" alt="VoltPilot" />
</a>

<p>Sites planning EV charging investments rarely know whether their grid connection can take the load. VoltPilot simulates it before anything is installed — transformer loading, battery dispatch, virtual grid signals, telemetry validation and generated engineering reports.</p>

<p>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Grid%20Simulation-B45309?style=flat-square" alt="Grid Simulation" />
<img src="https://img.shields.io/badge/Power%20Systems-1E40AF?style=flat-square" alt="Power Systems" />
</p>

</td>
</tr>
</table>

---

## Tech Stack

<div align="center">

<table>
<tr>
<td align="right" valign="middle"><b>Languages</b></td>
<td>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
<img src="https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black" alt="C" />
</td>
</tr>
<tr>
<td align="right" valign="middle"><b>AI &amp; Vision</b></td>
<td>
<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
<img src="https://img.shields.io/badge/YOLO-00B0FF?style=for-the-badge&logoColor=white" alt="YOLO" />
<img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV" />
<img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white" alt="NumPy" />
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
<img src="https://img.shields.io/badge/Red%20Hat%20Enterprise%20Linux-EE0000?style=for-the-badge&logo=redhat&logoColor=white" alt="RHEL" />
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

<img src="https://github-readme-stats.vercel.app/api?username=emrefbulut&show_icons=true&include_all_commits=true&count_private=true&rank_icon=github&bg_color=00000000&title_color=1F6FEB&text_color=6E7681&icon_color=1F6FEB&hide_border=true" height="170" alt="GitHub stats" />
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=emrefbulut&layout=compact&langs_count=8&bg_color=00000000&title_color=1F6FEB&text_color=6E7681&hide_border=true" height="170" alt="Top languages" />

<br />

<img src="https://streak-stats.demolab.com?user=emrefbulut&background=00000000&ring=1F6FEB&fire=1F6FEB&currStreakNum=6E7681&sideNums=6E7681&currStreakLabel=1F6FEB&sideLabels=6E7681&dates=6E7681&hide_border=true" alt="GitHub streak" />

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:58A6FF,45:1F6FEB,100:0D1117&height=120&section=footer" width="100%" alt="" />
