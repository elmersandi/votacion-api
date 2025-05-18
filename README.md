# 🗳️ Sistema de Votación - VOTACION-API

Este proyecto es una aplicación web de votación desarrollada con:

- 📦 Backend: Node.js + Express + MongoDB
- ⚛️ Frontend: React + Vite
- 🗂️ Base de datos: MongoDB local
- 💾 Persistencia del ganador
- 🎨 Interfaz medio y bloqueada cuando hay ganador

---

## 📌 Funcionalidades

- Registrar candidatos (nombre, apellido, partido)
- Registrar votantes (nombre, apellido, DNI)
- Emitir votos
- Mostrar ganador cuando un candidato alcanza 10 votos
- Bloquear votación automáticamente al encontrar ganador

---

## ✅ Requisitos previos

- Node.js instalado
- MongoDB instalado y ejecutándose localmente
- Git

---

## 🚀 Instrucciones para ejecutar

### 1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/votacion-api.git
cd votacion-api
