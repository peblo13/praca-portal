'use client'

import { useState } from 'react'

type Skill = { id: number; name: string; level: number }
type Education = { id: number; school: string; degree: string; period: string }
type Experience = { id: number; company: string; role: string; period: string; description: string }

const nextId = (items: { id: number }[]) => items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1

export default function CvFormPage() {
  const [saved, setSaved] = useState(false)
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'Komunikacja', level: 3 },
    { id: 2, name: 'Organizacja pracy', level: 3 },
    { id: 3, name: 'Praca zespołowa', level: 3 },
    { id: 4, name: 'TIG / MAG', level: 3 },
    { id: 5, name: 'Język angielski', level: 3 },
  ])
  const [education, setEducation] = useState<Education[]>([{ id: 1, school: '', degree: '', period: '' }])
  const [experience, setExperience] = useState<Experience[]>([{ id: 1, company: '', role: '', period: '', description: '' }])

  const updateSkill = (id: number, patch: Partial<Skill>) => setSkills((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item))
  const updateEducation = (id: number, patch: Partial<Education>) => setEducation((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item))
  const updateExperience = (id: number, patch: Partial<Experience>) => setExperience((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item))

  return <main className="form-page container">
    <a className="back-link" href="/kreator-cv">← Wróć do kreatora CV</a>
    <span className="section-kicker">KREATOR CV · KROK 1</span>
    <h1>Uzupełnij swoje CV.</h1>
    <p>Dodaj najważniejsze informacje i oceń swoje umiejętności złotymi gwiazdkami.</p>
    {saved ? <section className="success-state"><h2>CV zostało zapisane.</h2><p>Twój profil jest gotowy do pokazania rekruterom.</p><a className="button" href="/panel">Przejdź do panelu <span>↗</span></a></section> : <form className="publish-form cv-form" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}>
      <fieldset><legend>Dane podstawowe</legend><div className="form-grid">
        <label>Imię i nazwisko<input required name="name" placeholder="np. Jan Kowalski" /></label>
        <label>Stanowisko<input required name="role" placeholder="np. Spawacz TIG / MAG" /></label>
        <label>Lokalizacja<input required name="location" placeholder="np. Katowice lub zdalnie" /></label>
        <label>E-mail<input required type="email" name="email" placeholder="jan@example.com" /></label>
      </div></fieldset>

      <fieldset><legend>Umiejętności</legend><p className="fieldset-hint">Dodaj dowolną liczbę umiejętności i wybierz poziom od 1 do 5.</p><div className="repeat-list skills-list">
        {skills.map((skill) => <div className="skill-row" key={skill.id}><input className="skill-name-input" aria-label="Nazwa umiejętności" name={`skill-${skill.id}`} value={skill.name} onChange={(event) => updateSkill(skill.id, { name: event.target.value })} /><div className="star-rating" role="radiogroup" aria-label={`Poziom umiejętności ${skill.name}`}>{[1, 2, 3, 4, 5].map((star) => <button type="button" key={star} className={star <= skill.level ? 'star active' : 'star'} onClick={() => updateSkill(skill.id, { level: star })} aria-label={`${star} z 5`} aria-pressed={star === skill.level}>★</button>)}</div><b>{skill.level}/5</b><button type="button" className="remove-button" onClick={() => setSkills((items) => items.filter((item) => item.id !== skill.id))} aria-label={`Usuń umiejętność ${skill.name}`}>Usuń</button></div>)}
      </div><button type="button" className="text-link add-skill" onClick={() => setSkills((items) => [...items, { id: nextId(items), name: '', level: 1 }])}>+ Dodaj umiejętność</button></fieldset>

      <fieldset><div className="fieldset-heading"><legend>Edukacja</legend><button type="button" className="text-link" onClick={() => setEducation((items) => [...items, { id: nextId(items), school: '', degree: '', period: '' }])}>+ Dodaj szkołę</button></div><div className="repeat-list"><p className="repeat-count">{education.length} {education.length === 1 ? 'pozycja' : 'pozycje'}</p>{education.map((item, index) => <div className="repeat-card" key={item.id}><div className="repeat-card-title"><strong>Szkoła {index + 1}</strong>{education.length > 1 && <button type="button" className="remove-button" onClick={() => setEducation((items) => items.filter((entry) => entry.id !== item.id))}>Usuń</button>}</div><div className="form-grid"><label>Szkoła / uczelnia<input name={`education-school-${item.id}`} value={item.school} onChange={(event) => updateEducation(item.id, { school: event.target.value })} placeholder="np. Zespół Szkół Technicznych" /></label><label>Kierunek / tytuł<input name={`education-degree-${item.id}`} value={item.degree} onChange={(event) => updateEducation(item.id, { degree: event.target.value })} placeholder="np. Technik mechatronik" /></label><label>Okres<input name={`education-period-${item.id}`} value={item.period} onChange={(event) => updateEducation(item.id, { period: event.target.value })} placeholder="np. 2018–2022" /></label></div></div>)}</div></fieldset>

      <fieldset><div className="fieldset-heading"><legend>Doświadczenie</legend><button type="button" className="text-link" onClick={() => setExperience((items) => [...items, { id: nextId(items), company: '', role: '', period: '', description: '' }])}>+ Dodaj doświadczenie</button></div><div className="repeat-list"><p className="repeat-count">{experience.length} {experience.length === 1 ? 'pozycja' : 'pozycje'}</p>{experience.map((item, index) => <div className="repeat-card" key={item.id}><div className="repeat-card-title"><strong>Doświadczenie {index + 1}</strong>{experience.length > 1 && <button type="button" className="remove-button" onClick={() => setExperience((items) => items.filter((entry) => entry.id !== item.id))}>Usuń</button>}</div><div className="form-grid"><label>Firma<input name={`experience-company-${item.id}`} value={item.company} onChange={(event) => updateExperience(item.id, { company: event.target.value })} placeholder="np. WeldPro" /></label><label>Stanowisko<input name={`experience-role-${item.id}`} value={item.role} onChange={(event) => updateExperience(item.id, { role: event.target.value })} placeholder="np. Spawacz" /></label><label>Okres<input name={`experience-period-${item.id}`} value={item.period} onChange={(event) => updateExperience(item.id, { period: event.target.value })} placeholder="np. 2022–2024" /></label><label className="full-width">Opis<textarea name={`experience-description-${item.id}`} value={item.description} onChange={(event) => updateExperience(item.id, { description: event.target.value })} rows={3} placeholder="Najważniejsze obowiązki i osiągnięcia" /></label></div></div>)}</div></fieldset>

      <fieldset><legend>O mnie</legend><label>Krótki opis<textarea name="about" rows={5} placeholder="Napisz kilka zdań o swoim doświadczeniu i celach zawodowych." /></label></fieldset>
      <button className="button" type="submit">Zapisz CV <span>↗</span></button>
    </form>}
  </main>
}
