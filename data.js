// ============================================================
// CYBERCELL: LIFE PROTOCOL — данные игры
// ============================================================

const FACTIONS = {
  ether:  { name: "Эфир Динамикс",  short: "ЭФИР",   color: "#4dd0e1" },
  claw:   { name: "Железный Коготь", short: "КОГОТЬ", color: "#ff2a55" },
  stream: { name: "Чёрный Поток",   short: "ПОТОК",  color: "#a78bfa" },
  lotus:  { name: "Цифровой Лотос", short: "ЛОТОС",  color: "#f472b6" },
  free:   { name: "Свободные",      short: "СВОБОД", color: "#00ff9d" },
};

const NPCS = {
  v:       { name: "Сай",     desc: "Соседка. Хакерша. Эмоциональная и опасная." },
  kestrel: { name: "Кестрел", desc: "Курьер Чёрного Потока. Холодная. Не прощает долгов." },
  mira:    { name: "Мира",    desc: "Куратор Эфир Динамикс. Улыбается, когда считает твои кости." },
};

const LOCATIONS = {
  apartment: { name: "Капсула 7-Б",         desc: "12 м². Кровать, терминал, синт-еда." },
  street:    { name: "Улица Нижнего Яруса", desc: "Неон, дождь, торговцы, патрули." },
  work:      { name: "Департамент Учёта",   desc: "Твой корпоративный стол. 9 часов в сутки." },
  bar:       { name: "«Последний бит»",     desc: "Бар на границе секторов. Все сюда заходят." },
};

const CARDS = [

  // === УТРО ===
  {
    id: "wake_1", cat: "Рутина", title: "06:47 — Подъём",
    desc: "Будильник вжигает в висок <em>Эфир-стандарт 06:47</em>. По стенам капсулы бегут рекламные титры. Ты жив. Это уже что-то.",
    req: { phase: ["morning"] },
    opts: [
      { t: "Встать сразу", e: { stats: { stress: 3, clarity: 2 } } },
      { t: "Полежать 10 минут", e: { stats: { stress: -5, clarity: -2 }, cyber: 1 } },
      { t: "Съесть синт-пасту", e: { stats: { hunger: -30, stress: 2 }, credits: -5, counter: { pasta: 1 } } },
    ],
    w: 10, once: false, cd: 0,
  },
  {
    id: "wake_2", cat: "Рутина", title: "06:47 — Тяжёлое утро",
    desc: "Ты не спал. Ночью снились чужие лица. По виску ползёт <em>помеха</em>. Опять.",
    req: { phase: ["morning"], cyber_min: 25 },
    opts: [
      { t: "Умыться холодной водой", e: { stats: { stress: -3 }, cyber: -2 } },
      { t: "Принять стимулятор", e: { stats: { clarity: 8 }, cyber: 4, credits: -10 } },
      { t: "Смотреть в потолок", e: { stats: { stress: 5 }, cyber: 2 } },
    ],
    w: 15, once: false, cd: 0,
  },
  {
    id: "wake_3", cat: "Рутина", title: "Входящее сообщение",
    desc: "На терминале мигает <strong>неизвестный отправитель</strong>.\n\n«Я знаю, что ты сделал в секторе 4. Хочешь обсудить?»",
    req: { phase: ["morning"], day_min: 3 },
    opts: [
      { t: "Открыть сообщение", e: { flags_set: { msg_blackmail: true }, stats: { stress: 8 } } },
      { t: "Удалить и забыть", e: { flags_set: { msg_ignored: true }, stats: { stress: 4 } } },
      { t: "Скопировать в архив", e: { flags_set: { msg_archived: true } } },
    ],
    w: 20, once: true, cd: 0,
  },

  // === РАБОТА ===
  {
    id: "work_1", cat: "Работа", title: "Департамент Учёта",
    desc: "Твой стол. Три экрана. Справа — очередь из 40 заявок. Начальник — программа «ГАРМОНИЯ-7». Она оценивает твою <em>полезность</em> каждые 15 минут.",
    req: { phase: ["midday"], location: ["work"] },
    opts: [
      { t: "Работать в полную силу", e: { credits: 40, stats: { stress: 12, clarity: -5 }, faction: { ether: 5 } } },
      { t: "Работать в половину", e: { credits: 20, stats: { stress: 5 } } },
      { t: "Саботировать заявки", e: { credits: 0, stats: { stress: -3 }, cyber: 3, faction: { ether: -10 }, flags_set: { saboteur: true } } },
    ],
    w: 30, once: false, cd: 0,
  },
  {
    id: "work_2", cat: "Работа", title: "ГАРМОНИЯ-7 говорит",
    desc: "«Сотрудник №K-2884. Ваш <em>социальный кредит</em> снижен на 12 пунктов. Причина: недостаточная вовлечённость в корпоративные ритуалы. Рекомендуем посетить ближайший Центр Гармонии».",
    req: { phase: ["midday"], location: ["work"], day_min: 2 },
    opts: [
      { t: "Согласиться", e: { faction: { ether: 5 }, stats: { stress: 8 } } },
      { t: "Потребовать объяснений", e: { faction: { ether: -8 }, stats: { stress: 12, clarity: 5 }, flags_set: { rebel_1: true } } },
      { t: "Подкупить оператора", e: { credits: -50, faction: { ether: 3 }, flags_set: { bribed: true } } },
    ],
    w: 20, once: true, cd: 0,
  },
  {
    id: "work_3", cat: "Работа", title: "Сверхурочные",
    desc: "Предложение от куратора Миры: остаться после смены на 3 часа. Двойная оплата. <em>Гарантированный стресс</em>.",
    req: { phase: ["midday"], location: ["work"], rel: { mira: 0 } },
    opts: [
      { t: "Согласиться", e: { credits: 80, stats: { stress: 18, clarity: -8 }, rel: { mira: 10 } } },
      { t: "Отказаться", e: { rel: { mira: -5 }, stats: { stress: -3 } } },
    ],
    w: 20, once: false, cd: 3,
  },

  // === УЛИЦА ===
  {
    id: "street_1", cat: "Улица", title: "Патруль «Серых Псов»",
    desc: "На выходе из квартала — блокпост. Двое в броне, визоры сканируют лица. Очередь. Люди не смотрят друг другу в глаза.",
    req: { phase: ["midday", "evening"], location: ["street"] },
    opts: [
      { t: "Пройти через сканер", e: { stats: { stress: 5 }, faction: { ether: 2 } } },
      { t: "Обойти через дворы", e: { stats: { stress: 3, health: -3 }, cyber: 1, flags_set: { avoided_patrol: true } } },
      { t: "Дать взятку", e: { credits: -30, faction: { ether: 1 }, flags_set: { bribed: true } } },
    ],
    w: 20, once: false, cd: 2,
  },
  {
    id: "street_2", cat: "Улица", title: "Продавец имплантов",
    desc: "«Эй, друг. Свежие нейро-моды. Дешёво. Без гарантии. Без вопросов». За лотком — человек с тремя глазами и улыбкой, в которой не хватает зубов.",
    req: { phase: ["midday", "evening"], location: ["street"], cyber_max: 70 },
    opts: [
      { t: "Купить дешёвый мод", e: { credits: -40, cyber: 8, stats: { clarity: 5 }, flags_set: { cheap_mod: true } } },
      { t: "Отказаться", e: { stats: { clarity: 1 } } },
      { t: "Ограбить лоток", e: { credits: 60, cyber: 6, faction: { claw: 5, free: -5 }, stats: { stress: 8 }, flags_set: { robbed_vendor: true } } },
    ],
    w: 15, once: false, cd: 4,
  },
  {
    id: "street_3", cat: "Улица", title: "Тело в переулке",
    desc: "Мужчина. Ещё дышит. Рядом — пустой шприц и выжженный корпоративный бейдж. Мимо идут люди. Никто не останавливается.",
    req: { phase: ["evening"], location: ["street"], day_min: 2 },
    opts: [
      { t: "Вызвать скорую", e: { credits: -10, stats: { stress: 6, clarity: 5 }, faction: { free: 5 } } },
      { t: "Забрать бейдж", e: { cyber: 4, faction: { stream: 3 }, flags_set: { has_badge: true } } },
      { t: "Уйти", e: { stats: { stress: 3 }, cyber: 2 } },
    ],
    w: 15, once: true, cd: 0,
  },

  // === NPC: САЙ ===
  {
    id: "sai_1", cat: "Сай", title: "Сай стучит в стену",
    desc: "Три удара. Ваш условный сигнал. Через минуту — сообщение: «Открой. У меня проблемы. Большие».",
    req: { phase: ["evening"], location: ["apartment"], rel: { v: -100 } },
    opts: [
      { t: "Открыть", e: { rel: { v: 10 }, stats: { stress: 8 }, flags_set: { v_in_danger: true } } },
      { t: "Сделать вид, что спишь", e: { rel: { v: -15 }, stats: { stress: 5 }, flags_set: { v_abandoned: true } } },
    ],
    w: 30, once: true, cd: 0,
  },
  {
    id: "sai_2", cat: "Сай", title: "Ночной разговор с Сай",
    desc: "Она сидит на полу твоей капсулы. Пьёт синт-вино. Смотрит не на тебя, а в стену.\n\n«Иногда я думаю — если я умру, Сеть заметит? Хоть кто-то?»",
    req: { phase: ["evening", "night"], location: ["apartment"], flag: { v_in_danger: true } },
    opts: [
      { t: "Сказать: «Я замечу»", e: { rel: { v: 15 }, stats: { clarity: 8, stress: -5 }, cyber: -3 } },
      { t: "Промолчать", e: { rel: { v: 3 }, stats: { clarity: 3 } } },
      { t: "Спросить про её прошлое", e: { rel: { v: 8 }, flags_set: { v_past_known: true }, stats: { stress: 5 } } },
    ],
    w: 25, once: false, cd: 2,
  },
  {
    id: "sai_3", cat: "Сай", title: "Сай предлагает работу",
    desc: "«Есть заказ. Вскрыть корпоративный узел. Оплата — 300. Риск — реальный. Ты в деле?»",
    req: { phase: ["evening"], rel: { v: 20 }, day_min: 4 },
    opts: [
      { t: "Согласиться", e: { credits: 300, stats: { stress: 20 }, cyber: 5, rel: { v: 15 }, faction: { ether: -15 }, flags_set: { heist_done: true } } },
      { t: "Отказаться", e: { rel: { v: -8 } } },
    ],
    w: 30, once: true, cd: 0,
  },

  // === NPC: КЕСТРЕЛ ===
  {
    id: "kestrel_1", cat: "Кестрел", title: "Кестрел в баре",
    desc: "Она сидит одна. Перед ней — стакан, к которому она не притрагивается. Смотрит на тебя ровно 3 секунды. Потом кивает на стул напротив.",
    req: { phase: ["evening"], location: ["bar"] },
    opts: [
      { t: "Сесть", e: { rel: { kestrel: 10 }, flags_set: { met_kestrel: true }, stats: { stress: 4 } } },
      { t: "Игнорировать", e: { rel: { kestrel: -10 } } },
    ],
    w: 30, once: true, cd: 0,
  },
  {
    id: "kestrel_2", cat: "Кестрел", title: "Первое задание",
    desc: "«Простая работа. Забрать пакет в секторе 4. Не открывать. Не спрашивать. 150 кредитов».",
    req: { flag: { met_kestrel: true }, phase: ["midday", "evening"], rel: { kestrel: 0 } },
    opts: [
      { t: "Взять задание", e: { credits: 150, stats: { stress: 10 }, faction: { stream: 10 }, flags_set: { stream_runner: true } } },
      { t: "Отказаться", e: { rel: { kestrel: -5 } } },
    ],
    w: 25, once: false, cd: 3,
  },

  // === NPC: МИРА ===
  {
    id: "mira_1", cat: "Мира", title: "Мира вызывает",
    desc: "Кабинет на 47-м этаже. Панорамное окно. Мира улыбается. У неё безупречная кожа — слишком безупречная.\n\n«У меня есть для вас особое поручение. Если справитесь — повышение».",
    req: { phase: ["midday"], location: ["work"], day_min: 3 },
    opts: [
      { t: "Внимательно слушать", e: { rel: { mira: 10 }, faction: { ether: 5 } } },
      { t: "Отказаться заранее", e: { rel: { mira: -15 }, faction: { ether: -10 }, stats: { stress: 5 } } },
    ],
    w: 25, once: true, cd: 0,
  },
  {
    id: "mira_2", cat: "Мира", title: "Особое поручение",
    desc: "«Нужно подписать один документ. Формально — просто перевод средств. Фактически — вы закрываете глаза на... несоответствия. 500 кредитов».",
    req: { rel: { mira: 10 }, phase: ["midday"], day_min: 4 },
    opts: [
      { t: "Подписать", e: { credits: 500, faction: { ether: 15, free: -10 }, rel: { mira: 15 }, flags_set: { signed_dirty: true }, stats: { stress: 10 } } },
      { t: "Отказаться", e: { rel: { mira: -20 }, faction: { ether: -10 }, stats: { clarity: 5 }, flags_set: { refused_dirty: true } } },
    ],
    w: 30, once: true, cd: 0,
  },

  // === ФРАКЦИИ ===
  {
    id: "claw_1", cat: "Коготь", title: "Вербовка «Железного Когтя»",
    desc: "В переулке тебя останавливают трое. Молчание. Потом один говорит: «Ты выглядишь как человек, который устал быть ничем. Мы даём шанс».",
    req: { phase: ["evening"], location: ["street"], faction: { claw: -50 }, cyber_max: 40 },
    opts: [
      { t: "Слушать", e: { faction: { claw: 15 }, flags_set: { claw_invited: true } } },
      { t: "Уйти", e: { faction: { claw: -5 } } },
    ],
    w: 20, once: true, cd: 0,
  },
  {
    id: "claw_2", cat: "Коготь", title: "Первая кровь",
    desc: "Проверка. «Один человек должен исчезнуть. Не убить. Просто — исчезнуть. Ты понял».",
    req: { flag: { claw_invited: true }, faction: { claw: 10 }, phase: ["night"] },
    opts: [
      { t: "Сделать", e: { faction: { claw: 25 }, credits: 100, cyber: 10, stats: { stress: 15, health: -10 }, flags_set: { claw_blood: true } } },
      { t: "Отказаться", e: { faction: { claw: -30 }, stats: { stress: 8 }, flags_set: { claw_refused: true } } },
    ],
    w: 40, once: true, cd: 0,
  },
  {
    id: "free_1", cat: "Свободные", title: "Свободные в подполье",
    desc: "Сай ведёт тебя вниз, в тоннели. Там люди без регистрации. Без имплантов. Смотрят на тебя с подозрением.\n\n«Держись рядом. Не говори лишнего».",
    req: { rel: { v: 25 }, day_min: 5 },
    opts: [
      { t: "Познакомиться", e: { faction: { free: 20 }, cyber: -5, stats: { clarity: 8 }, flags_set: { met_free: true } } },
      { t: "Молчать и наблюдать", e: { faction: { free: 8 }, stats: { clarity: 4 } } },
    ],
    w: 25, once: true, cd: 0,
  },

  // === ВЕЧЕР ===
  {
    id: "evening_1", cat: "Вечер", title: "Вечер в капсуле",
    desc: "Ты один. Стены гудят от чужой музыки. Терминал предлагает: сериал, VR-порно, медитацию, новости.",
    req: { phase: ["evening"], location: ["apartment"] },
    opts: [
      { t: "VR-порно", e: { stats: { stress: -10 }, cyber: 5, credits: -5 } },
      { t: "Медитация", e: { stats: { clarity: 10, stress: -5 }, cyber: -5 } },
      { t: "Новости", e: { stats: { stress: 3 }, flags_set: { news_watched: true } } },
      { t: "Спать пораньше", e: { stats: { stress: -8, health: 5 } } },
    ],
    w: 20, once: false, cd: 0,
  },
  {
    id: "bar_1", cat: "Бар", title: "«Последний бит»",
    desc: "Дым, неон, синт-алкоголь. Музыка — из 2070-х. За стойкой — бармен с механической рукой.",
    req: { phase: ["evening"], location: ["bar"] },
    opts: [
      { t: "Выпить", e: { credits: -15, stats: { stress: -12, health: -3 }, cyber: 2 } },
      { t: "Слушать разговоры", e: { stats: { stress: -4 }, flags_set: { rumors_heard: true } } },
      { t: "Напиться", e: { credits: -40, stats: { stress: -20, health: -10 }, cyber: 8 } },
    ],
    w: 20, once: false, cd: 0,
  },

  // === НОЧЬ ===
  {
    id: "night_1", cat: "Ночь", title: "Сон",
    desc: "Ты засыпаешь под шум города. В голове — чужие голоса. Не твои.",
    req: { phase: ["night"] },
    opts: [
      { t: "Спать", e: { stats: { health: 10, stress: -10, clarity: 3 }, cyber: -3 } },
      { t: "Не спать. Работать", e: { credits: 30, stats: { stress: 10, health: -5 }, cyber: 3 } },
      { t: "Смотреть в потолок", e: { stats: { stress: 5, clarity: 5 } } },
    ],
    w: 40, once: false, cd: 0,
  },
  {
    id: "night_2", cat: "Ночь", title: "Кибер-эпизод",
    desc: "Ты просыпаешься от того, что твои руки двигаются сами. На стене — надписи, которых ты не писал. <em>Голос</em> произносит твоё имя наоборот.",
    req: { phase: ["night"], cyber_min: 51 },
    opts: [
      { t: "Бороться", e: { stats: { stress: 15, health: -5 }, cyber: -5 } },
      { t: "Отдаться", e: { cyber: 8, stats: { clarity: -10 }, flags_set: { surrendered_once: true } } },
      { t: "Принять успокоительное", e: { cyber: -10, credits: -20, stats: { stress: -5 } } },
    ],
    w: 50, once: false, cd: 1,
  },

  // === КАТ-СЦЕНЫ ===
  {
    id: "cut_1", cat: "Тишина", title: "Островок",
    desc: "cutscene",
    cut: "Ты стоишь на балконе 47-го этажа.\n\nПод тобой — город. Миллионы жизней. Миллионы единиц ресурса.\n\nСегодня никто не звонит. Ничего не горит. Ты просто дышишь.\n\nВдох. Выдох.\n\nТы жив. Пока — жив.",
    req: { phase: ["evening"], day_min: 3 },
    opts: [{ t: "Дышать", e: { stats: { clarity: 15, stress: -15 }, cyber: -8 } }],
    w: 15, once: true, cd: 0,
  },
  {
    id: "cut_2", cat: "Тишина", title: "Вода",
    desc: "cutscene",
    cut: "Ты сидишь на краю технического бассейна в подвале блока.\n\nВода чёрная. В ней отражаются только огни — твоё лицо исчезло в ней давно.\n\nТы бросаешь камень. Круги. И снова ровная гладь.\n\n«Я ещё здесь», — говоришь ты вслух. Голос звучит странно. Но звучит.",
    req: { phase: ["night"], cyber_min: 30 },
    opts: [{ t: "Смотреть на воду", e: { stats: { clarity: 12, stress: -12 }, cyber: -10 } }],
    w: 15, once: false, cd: 5,
  },

  // === БЮРОКРАТИЯ ===
  {
    id: "buro_1", cat: "Бюрократия", title: "Проверка заявки",
    desc: "bureaucracy",
    doc: {
      title: "ЗАЯВЛЕНИЕ №4482-K",
      fields: [
        { k: "Заявитель", v: "Орлов К.В." },
        { k: "Сектор", v: "4" },
        { k: "Цель", v: "Перевод жилья" },
        { k: "Соц. кредит", v: "42", err: true },
        { k: "Импланты", v: "3" },
        { k: "Статус", v: "Подозрительный" },
      ],
    },
    req: { phase: ["midday"], location: ["work"], day_min: 2 },
    opts: [
      { t: "Одобрить", e: { credits: 20, faction: { ether: 5 }, flags_set: { approved_4482: true } } },
      { t: "Отклонить", e: { credits: 10, faction: { ether: 3 }, stats: { stress: 3 } } },
      { t: "Передать выше", e: { faction: { ether: 2 }, stats: { stress: -2 } } },
    ],
    w: 25, once: true, cd: 0,
  },

  // === СОБЫТИЯ ===
  {
    id: "event_1", cat: "Событие", title: "Корпоративная лотерея",
    desc: "На терминале — всплывающее окно: «Испытайте удачу! Разыгрывается 10 000 кредитов! Стоимость билета — 50 кредитов». Под кнопкой мелким шрифтом: «Организатор не несёт ответственности за порчу имущества, здоровья и личности».",
    req: { phase: ["midday", "evening"], day_min: 2 },
    opts: [
      { t: "Купить билет", e: { credits: -50, flags_set: { lottery_ticket: true } } },
      { t: "Закрыть", e: {} },
    ],
    w: 10, once: false, cd: 5,
  },
  {
    id: "event_2", cat: "Событие", title: "Отключение воды",
    desc: "Управление блока объявляет: «В связи с оптимизацией водоснабжения, вода будет отключена на 3 дня. Приносим извинения за возможные неудобства».",
    req: { phase: ["morning"], day_min: 3 },
    opts: [
      { t: "Запастись", e: { credits: -20, flags_set: { has_water: true } } },
      { t: "Игнорировать", e: { flags_set: { no_water: true }, stats: { stress: 5 } } },
    ],
    w: 15, once: true, cd: 0,
  },
  {
    id: "event_3", cat: "Событие", title: "Ты видишь себя в новостях",
    desc: "На экране — твоё фото. «Разыскивается в связи с инцидентом в секторе 4». Ты никогда там не был. Кажется.",
    req: { phase: ["evening"], day_min: 4, flag: { heist_done: true } },
    opts: [
      { t: "Смотреть", e: { stats: { stress: 15 }, flags_set: { wanted: true } } },
      { t: "Отвернуться", e: { stats: { stress: 8 }, cyber: 3 } },
    ],
    w: 30, once: true, cd: 0,
  },
];

const ENDINGS = [
  {
    id: "cyber_end",
    title: "ПОЛНАЯ ПОТЕРЯ",
    tag: "КИБЕРПСИХОЗ 100%",
    desc: "Ты больше не ты.\n\nТы — машина. Ты — функция. Ты — то, что осталось после того, как человек ушёл.\n\nГород не заметил. Город никогда не замечает.",
    check: (s) => s.cyber >= 100,
  },
  {
    id: "corp_end",
    title: "ВЕРНЫЙ ИСПОЛНИТЕЛЬ",
    tag: "ЭФИР ДИНАМИКС",
    desc: "Ты поднялся. У тебя есть кабинет на 60-м этаже. У тебя есть импланты, о которых мечтают миллионы.\n\nТы больше не помнишь, зачем всё это начал.\n\nНо ты — эффективен. ГАРМОНИЯ-7 довольна.",
    check: (s) => s.day >= 7 && s.factions.ether >= 40 && s.cyber >= 40,
  },
  {
    id: "street_end",
    title: "УЛИЧНЫЙ БОЕЦ",
    tag: "ЖЕЛЕЗНЫЙ КОГОТЬ",
    desc: "Ты выжил. Ты стал частью Когтя.\n\nУ тебя есть братья, которые убьют за тебя. У тебя есть враги, которых ты убьёшь сам.\n\nТы не стал никем. Ты стал собой.",
    check: (s) => s.day >= 7 && s.factions.claw >= 30,
  },
  {
    id: "survive_end",
    title: "ТИХАЯ ЖИЗНЬ",
    tag: "НИКТО",
    desc: "Ты дожил до конца недели. Ты не стал героем. Не стал злодеем. Не стал никем значимым.\n\nТы просто человек в городе, который не считает людей.\n\nИ это, возможно, лучшая концовка из возможных.",
    check: (s) => s.day >= 7,
  },
];
