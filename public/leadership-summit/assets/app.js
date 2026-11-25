/**
 * JLU LEADERSHIP SUMMIT 2026 — VERSION 4 ("COBALT & CHARTREUSE EDITION")
 * 26 November 2026 · A One-Day Interdisciplinary Leadership Forum (09:30 – 17:30)
 * Pure Vanilla JavaScript · Uses global CSS custom properties from `styles.css`
 */

document.addEventListener('DOMContentLoaded', () => {

  function getThemeColor(varName, fallback) {
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return val || fallback;
  }

  // ==========================================
  // 0. LIGHT / DARK THEME SWITCHER (FOOTER)
  // ==========================================
  const THEME_STORAGE_KEY = 'jlu-v4-theme';
  const themeButtons = document.querySelectorAll('[data-theme-set]');

  function applyTheme(theme) {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', normalized);

    themeButtons.forEach(btn => {
      const isMatch = btn.getAttribute('data-theme-set') === normalized;
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    try {
      localStorage.setItem(THEME_STORAGE_KEY, normalized);
    } catch (err) {
      // Ignore storage errors in restricted environments
    }
  }

  let initialTheme = 'light';
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      initialTheme = savedTheme;
    }
  } catch (err) {
    // Default to light
  }
  applyTheme(initialTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-theme-set');
      applyTheme(target);
    });
  });

  // ==========================================
  // 1. DATA: Updated Summit Agenda (26 Nov 2026 · 09:30 – 13:30 + Awaited Confirmations)
  // ==========================================
  const SCHEDULE_DATA = {
    day1: [
      {
        id: 'slot-1',
        day: '26 Nov 2026',
        time: '09:30 – 09:45',
        status: 'TBA',
        isLaunch: false,
        schoolTag: 'Arrival & Check-in',
        category: 'Registration',
        title: 'Registration',
        speakerLine: 'Delegate check-in and networking for early arrivals · TBA',
        location: 'JLU SEH Foyer · Chandanpura, Bhopal',
        details: 'Delegate check-in and networking for early arrivals across JLU students, faculty, deans, alumni, and invited guests.',
        bullets: [
          'Delegate check-in and badge collection',
          'Early arrival networking prior to the opening remarks'
        ]
      },
      {
        id: 'slot-2',
        day: '26 Nov 2026',
        time: '09:45 – 10:00',
        status: 'Confirmed',
        isLaunch: false,
        schoolTag: 'Opening Address',
        category: 'Opening Remarks',
        title: 'Opening Remarks',
        speakerLine: 'Mr. Abhishek Mohan Gupta · Welcome address and vision overview',
        location: 'Jagran Lakecity University SEH, Chandanpura, Bhopal',
        details: 'Welcome address and overview of the vision behind the JLU Leadership Summit.',
        bullets: [
          'Welcome address to delegates and visiting leaders',
          'Overview of the vision behind the JLU Leadership Summit'
        ]
      },
      {
        id: 'slot-3',
        day: '26 Nov 2026',
        time: '10:00 – 10:40',
        status: 'Confirmed',
        isLaunch: false,
        schoolTag: 'Keynote Address',
        category: 'Keynote Address',
        title: 'Keynote Address: "Why Leadership Is No Longer Just About Having a Title"',
        speakerLine: 'Dr. Pawan Agarwal (Mumbai Dabbawala)',
        location: 'Jagran Lakecity University SEH, Chandanpura, Bhopal',
        details: 'Keynote address exploring operational excellence, human coordination, discipline, and leadership beyond titles through the world-renowned Mumbai Dabbawala model.',
        bullets: [
          'Six Sigma precision through shared ownership and frontline accountability',
          'Why leadership is defined by action and reliability rather than titles',
          'Interactive "Ask the Leader" student Q&A'
        ]
      },
      {
        id: 'slot-4',
        day: '26 Nov 2026',
        time: '10:40 – 11:20',
        status: 'Confirmed',
        isLaunch: false,
        schoolTag: 'Fireside Chat',
        category: 'Fireside Chat',
        title: 'Fireside Chat: Interactive Discussion',
        speakerLine: 'Mr. Neelabh Banerjee (National Creative Director, Reliance Industries Limited) · Moderator: Prof. Diwakar Shukla',
        location: 'Jagran Lakecity University SEH, Chandanpura, Bhopal',
        details: 'An interactive fireside chat on creative leadership, visual storytelling, and building distinctive brands and teams at enterprise scale.',
        bullets: [
          'Interactive discussion moderated by Prof. Diwakar Shukla',
          'Leading creative teams and building brand identities around big ideas',
          'Live student Q&A'
        ]
      },
      {
        id: 'slot-5',
        day: '26 Nov 2026',
        time: '11:20 – 11:30',
        status: 'Break',
        isLaunch: false,
        schoolTag: 'Networking Break',
        category: 'Coffee Break',
        title: 'Coffee Break',
        speakerLine: '10-minute networking break and interaction',
        location: 'SEH Concourse · JLU Chandanpura, Bhopal',
        details: 'Short refreshment break and networking intermission.',
        bullets: [
          'Refreshments served in the SEH Concourse',
          'Networking with speakers and delegates'
        ]
      },
      {
        id: 'slot-6',
        day: '26 Nov 2026',
        time: '11:30 – 12:30',
        status: 'Confirmed',
        isLaunch: false,
        schoolTag: 'Panel Discussion',
        category: 'Panel Discussion',
        title: 'Panel Discussion: "Venture Capitalists: Leading the Growth of Startup Success Through Capital"',
        speakerLine: 'Mr. Mahavir Pratap Sharma (General Partner, Swishin Ventures) · Mr. Amit Singal (Partner, Indicorn Angel Fund)',
        location: 'Jagran Lakecity University SEH, Chandanpura, Bhopal',
        details: 'Venture capital leaders discuss how capital, mentorship, and strategic governance accelerate startup growth. Note: Requesting VC moderator for this session.',
        bullets: [
          'How VCs evaluate founders, teams, and scalable ideas',
          'Leading startup growth beyond capital through strategic mentorship',
          'Note: Requesting VC moderator for this session'
        ]
      },
      {
        id: 'slot-7',
        day: '26 Nov 2026',
        time: '12:30 – 13:10',
        status: 'Confirmed',
        isLaunch: false,
        schoolTag: 'Alumni Keynote',
        category: 'Alumni Keynote',
        title: 'Alumni Keynote: "Alumni as Leaders: Inspiring Journeys"',
        speakerLine: '',
        location: 'Jagran Lakecity University SEH, Chandanpura, Bhopal',
        details: 'Inspiring journeys from JLU alumni leaders sharing their path from campus to industry leadership.',
        bullets: [
          'Lessons from campus to leadership roles',
          'Interactive Q&A with current JLU students'
        ]
      },
      {
        id: 'slot-8',
        day: '26 Nov 2026',
        time: '13:10 – 13:30',
        status: 'TBA',
        isLaunch: false,
        schoolTag: 'Closing',
        category: 'Vote of Thanks',
        title: 'Vote of Thanks',
        speakerLine: 'Closing remarks and networking session · TBA',
        location: 'Jagran Lakecity University SEH, Chandanpura, Bhopal',
        details: 'Closing remarks, vote of thanks, and post-summit networking session.',
        bullets: [
          'Official Vote of Thanks to speakers, moderators, and delegates',
          'Closing networking session'
        ]
      }
    ]
  };

  // ==========================================
  // 2. DATA: Speakers Profile Index (Aligned to Updated Schedule)
  // ==========================================
  const SPEAKERS_DATA = {
    'speaker-pawan': {
      name: 'Dr. Pawan Agarwal',
      title: 'Mumbai Dabbawala · Keynote Speaker',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
      bio: 'Dr. Pawan Agarwal is an internationally acclaimed motivational speaker, author, and educationist who has shared the operational and leadership philosophy of the Mumbai Dabbawalas at global forums, universities, and boardrooms worldwide.',
      talk: 'Keynote Address: "Why Leadership Is No Longer Just About Having a Title"',
      keypoints: [
        'Six Sigma precision powered by human commitment and culture',
        'Why true leadership is action, reliability, and service—not a title',
        'Lessons applicable across management, technology, and society'
      ]
    },
    'speaker-neelabh': {
      name: 'Mr. Neelabh Banerjee',
      title: 'National Creative Director, Reliance Industries Limited',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
      bio: 'Mr. Neelabh Banerjee serves as National Creative Director at Reliance Industries Limited. An acclaimed cartoonist, illustrator, and creative strategist, he has led visual storytelling and large-scale creative teams across national media and corporate ecosystems.',
      talk: 'Fireside Chat: Interactive Discussion · Moderator: Prof. Diwakar Shukla',
      keypoints: [
        'When a creative practice needs structure and leadership',
        'Leading design-led and multidisciplinary storytelling teams',
        'Building distinctive brand identities around big ideas'
      ]
    },
    'speaker-mahavir': {
      name: 'Mr. Mahavir Pratap Sharma',
      title: 'General Partner, Swishin Ventures',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80',
      bio: 'Mr. Mahavir Pratap Sharma is a seasoned venture capitalist, angel investor, and entrepreneur serving as General Partner at Swishin Ventures, mentoring high-growth founders and early-stage ventures across India.',
      talk: 'Panel Discussion: "Venture Capitalists: Leading the Growth of Startup Success Through Capital"',
      keypoints: [
        'Backing visionary founders and scalable business models',
        'Startup governance, resilience, and growth through venture capital',
        'Building entrepreneurial ecosystems beyond metro hubs'
      ]
    },
    'speaker-amit': {
      name: 'Mr. Amit Singal',
      title: 'Partner, Indicorn Angel Fund',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80',
      bio: 'Mr. Amit Singal is Partner at Indicorn Angel Fund, actively investing in and advising emerging startups on capital strategy, product-market fit, and sustainable leadership.',
      talk: 'Panel Discussion: "Venture Capitalists: Leading the Growth of Startup Success Through Capital"',
      keypoints: [
        'Angel and early-stage investment thesis for student & emerging founders',
        'Scaling from early traction to institutional capital',
        'Strategic mentorship for young entrepreneurs'
      ]
    },
    'speaker-rouble': {
      name: 'Ms. Rouble Nagi',
      title: 'Women in Leadership',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
      bio: 'Acclaimed artist, social entrepreneur, and changemaker known for transforming communities through art and education initiatives across India.',
      talk: 'Keynote Address: "Women in Leadership"',
      keypoints: [
        'Leading with creativity, purpose, and social impact',
        'Building credibility and driving community-scale change',
        'Mentorship and women leadership across industries'
      ]
    },
    'speaker-vaibhav': {
      name: 'Mr. Vaibhav Kumar Shrivastava',
      title: 'India Head, Education at Google',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
      bio: 'Mr. Vaibhav Kumar Shrivastava leads Google’s Education charter in India, partnering with universities and institutions to integrate AI, cloud technologies, and digital transformation into higher education.',
      talk: 'Fireside Chat & Gemini Center Launch · Moderator: Mr. Nemesh Singh',
      keypoints: [
        'Gemini Center Launch at Jagran Lakecity University',
        'Leading technical teams in the age of AI',
        'Technology and innovation in higher education'
      ]
    }
  };

  // ==========================================
  // 3. RENDER VERTICAL TIMELINE SCHEDULE (ONE-DAY FORUM)
  // ==========================================
  const timelineContainer = document.getElementById('schedule-timeline-items');
  const scheduleDayBadge = document.getElementById('schedule-day-badge');

  function getSessionById(sessionId) {
    return SCHEDULE_DATA.day1.find(s => s.id === sessionId) || null;
  }

  function renderTimeline() {
    if (!timelineContainer) return;

    const list = SCHEDULE_DATA.day1;

    if (scheduleDayBadge) {
      scheduleDayBadge.textContent = `${list.length} Sessions · One-Day Forum (26 Nov 2026) · JLU SEH, Chandanpura`;
    }

    const firstTba = list.findIndex(s => s.time === 'TBA');
    const chevron = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

    timelineContainer.innerHTML = list.map((item, i) => {
      const dotClass = item.isLaunch ? 'tl-dot--launch' : item.time === 'TBA' ? 'tl-dot--tba' : item.status === 'Break' ? 'tl-dot--break' : '';
      const launchBadge = item.isLaunch
        ? '<span class="inline-block px-2 py-0.5 rounded bg-v4-accent text-v4-accent-ink font-heading font-bold text-[10px] uppercase tracking-wider">Launch</span>'
        : '';
      const divider = i === firstTba ? `
        <div class="tl-row grid grid-cols-[1.5rem_1fr] sm:grid-cols-[7rem_1.5rem_1fr] gap-x-3 sm:gap-x-4 px-2 sm:px-3">
          <div class="hidden sm:block"></div>
          <div class="tl-node"></div>
          <p class="py-3 font-heading font-bold text-[11px] uppercase tracking-[0.16em] text-v4-muted">Timings to be announced</p>
        </div>` : '';
      return divider + `
      <div class="tl-row group grid grid-cols-[1.5rem_1fr] sm:grid-cols-[7rem_1.5rem_1fr] gap-x-3 sm:gap-x-4 cursor-pointer rounded-lg px-2 sm:px-3 hover:bg-v4-bg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
           data-session-id="${item.id}" role="button" tabindex="0" aria-label="${item.title.replace(/"/g, '&quot;')} — open details">
        <!-- Time column (tablet/desktop) -->
        <div class="hidden sm:block pt-3.5 text-left">
          <span class="font-heading font-bold text-[13px] text-v4-ink block">${item.time}</span>
          ${launchBadge ? `<span class="block mt-1">${launchBadge}</span>` : ''}
        </div>

        <!-- Rail + dot -->
        <div class="tl-node"><span class="tl-dot ${dotClass}"></span></div>

        <!-- Content -->
        <div class="min-w-0 py-3.5 border-b border-v4-border flex items-start gap-2">
          <div class="flex-1 min-w-0">
            <p class="sm:hidden font-heading font-bold text-[13px] text-v4-accent-text mb-1 flex items-center gap-2">${item.time} ${launchBadge}</p>
            <span class="inline-block text-[11px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-v4-primary-tint text-v4-accent-text mb-1.5">${item.schoolTag}</span>
            <h4 class="font-heading font-bold text-[15px] sm:text-base text-v4-ink leading-snug">${item.title}</h4>
            ${item.speakerLine ? `<p class="text-[13px] sm:text-sm text-v4-muted mt-1 leading-relaxed">${item.speakerLine}</p>` : ''}
          </div>
          <span class="shrink-0 mt-1 text-v4-muted sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">${chevron}</span>
        </div>
      </div>`;
    }).join('');

    timelineContainer.querySelectorAll('[data-session-id]').forEach(row => {
      const open = () => openSessionModal(row.getAttribute('data-session-id'));
      row.addEventListener('click', open);
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }
  // ==========================================
  // 4. SPEAKER CATEGORY FILTER PILLS
  // ==========================================
  const filterButtons = document.querySelectorAll('[data-speaker-filter]');
  const speakerCards = document.querySelectorAll('.speaker-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-speaker-filter');

      filterButtons.forEach(b => {
        b.classList.remove('tab-v4-active');
        b.classList.add('tab-v4-inactive');
      });
      btn.classList.add('tab-v4-active');
      btn.classList.remove('tab-v4-inactive');

      speakerCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || (cardCat && cardCat.split(' ').includes(cat))) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================
  // 5. SPEAKER & SESSION MODALS
  // ==========================================
  const speakerModal = document.getElementById('speaker-modal');
  const speakerModalBody = document.getElementById('speaker-modal-body');
  const closeSpeakerBtn = document.getElementById('close-speaker-modal');

  const sessionModal = document.getElementById('session-modal');
  const sessionModalBody = document.getElementById('session-modal-body');
  const closeSessionBtn = document.getElementById('close-session-modal');

  function openSpeakerModal(speakerId) {
    const sp = SPEAKERS_DATA[speakerId];
    if (!sp || !speakerModal || !speakerModalBody) return;

    speakerModalBody.innerHTML = `
      <div class="flex flex-col sm:flex-row gap-6 items-start">
        <div class="w-36 sm:w-44 h-44 shrink-0 speaker-v4-frame rounded-lg">
          <img src="${sp.photo}" alt="${sp.name}" class="speaker-v4-img" />
        </div>
        <div class="flex-1 min-w-0">
          <h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-v4-ink leading-tight">
            ${sp.name}
          </h2>
          <p class="text-sm font-semibold text-v4-muted mt-1">
            ${sp.title}
          </p>
          <div class="mt-4 p-3.5 rounded-lg bg-v4-bg border-l-4 border-v4-primary">
            <span class="text-[11px] font-heading font-bold uppercase text-v4-muted block">Session Focus</span>
            <p class="text-xs sm:text-sm font-bold text-v4-ink mt-0.5">${sp.talk.replace(/\s*\(\d{2}:\d{2}\s*[–-]\s*\d{2}:\d{2}\)/g, '')}</p>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-5 border-t border-v4-border">
        <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-v4-accent-text mb-2">Speaker Profile</h4>
        <p class="text-v4-muted text-sm leading-relaxed">${sp.bio}</p>

        <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-v4-accent-text mt-5 mb-2">Discussion Areas</h4>
        <div class="flex flex-wrap gap-2">
          ${sp.keypoints.map(pt => `
            <span class="px-3 py-1 rounded-full bg-v4-alt text-xs font-semibold text-v4-ink">
              • ${pt}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-v4-border flex justify-between items-center">
        <span class="text-[11px] text-v4-muted italic">* Includes live "Ask the Leader" student Q&A</span>
        <button type="button" class="btn-v4-primary text-xs py-2.5 px-6" onclick="document.getElementById('speaker-modal').classList.remove('open'); document.body.style.overflow = ''">
          Close
        </button>
      </div>
    `;

    speakerModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Speaker profile onclick popup disabled for now
  // document.querySelectorAll('[data-speaker-target]').forEach(card => {
  //   card.addEventListener('click', () => {
  //     const id = card.getAttribute('data-speaker-target');
  //     openSpeakerModal(id);
  //   });
  // });

  if (closeSpeakerBtn) {
    closeSpeakerBtn.addEventListener('click', () => {
      speakerModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  function openSessionModal(sessionId) {
    const session = getSessionById(sessionId);
    if (!session || !sessionModal || !sessionModalBody) return;

    sessionModalBody.innerHTML = `
      <div class="mb-3 pr-12 flex items-center gap-2 flex-wrap">
        <span class="px-2.5 py-0.5 rounded bg-v4-primary text-white font-heading font-bold text-xs uppercase">
          ${session.day || 'JLU Leadership Summit'} · ${session.time}
        </span>
        <span class="text-xs font-heading font-bold text-v4-ink uppercase px-2.5 py-0.5 rounded bg-v4-alt">
          ${session.schoolTag}
        </span>
      </div>

      <h2 class="font-heading font-extrabold text-xl sm:text-2xl text-v4-ink leading-snug">
        ${session.title}
      </h2>
      ${session.speakerLine ? `<p class="text-sm font-semibold text-v4-accent-text mt-1">${session.speakerLine}</p>` : ''}

      <div class="my-4 p-3.5 rounded-lg bg-v4-bg border border-v4-border flex flex-wrap items-center justify-between gap-2 text-xs text-v4-ink">
        <div><strong>Time:</strong> ${session.time}</div>
        <div><strong>Venue:</strong> ${session.location}</div>
      </div>

      <div class="space-y-4">
        <div>
          <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-v4-accent-text mb-1">Session Overview</h4>
          <p class="text-v4-muted text-sm leading-relaxed">${session.details}</p>
        </div>

        <div>
          <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-v4-accent-text mb-1.5">Key Discussion Points & Outcomes</h4>
          <ul class="space-y-1.5">
            ${session.bullets.map(b => `
              <li class="flex items-start gap-2 text-sm text-v4-ink">
                <span class="text-v4-accent-text font-bold">✓</span>
                <span>${b}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-v4-border flex justify-end">
        <button type="button" class="btn-v4-primary text-xs py-2.5 px-6" onclick="document.getElementById('session-modal').classList.remove('open'); document.body.style.overflow = ''">
          Close
        </button>
      </div>
    `;

    sessionModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (closeSessionBtn) {
    closeSessionBtn.addEventListener('click', () => {
      sessionModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  document.querySelectorAll('[data-open-session]').forEach(el => {
    el.addEventListener('click', () => {
      const slotId = el.getAttribute('data-open-session');
      if (slotId) openSessionModal(slotId);
    });
  });

  // ==========================================
  // 6. REGISTRATION MODAL ("REGISTER NOW")
  // ==========================================
  const rsvpModal = document.getElementById('rsvp-modal');
  const openRsvpBtns = document.querySelectorAll('[data-open-rsvp]');
  const closeRsvpBtn = document.getElementById('close-rsvp-modal');
  const rsvpForm = document.getElementById('rsvp-form');
  const ticketConfirmation = document.getElementById('ticket-confirmation');
  const ticketQrCanvas = document.getElementById('ticket-qr-canvas');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  let rsvpOpenedAt = Date.now();

  openRsvpBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (rsvpModal) {
        rsvpOpenedAt = Date.now();
        rsvpModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeRsvpBtn) {
    closeRsvpBtn.addEventListener('click', () => {
      rsvpModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  [speakerModal, sessionModal, rsvpModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    [speakerModal, sessionModal, rsvpModal].forEach(m => m && m.classList.remove('open'));
    document.body.style.overflow = '';
  });

  // Paste your deployed Google Apps Script Web App URL here to enable live Google Sheet sync.
  // When empty, registrations are saved locally in localStorage so you can test duplicate checks.
  const REGISTRATION_ENDPOINT = 'https://script.google.com/macros/s/AKfycbySkIK2ABcTvRAa-79kzjXv4c-dSji_sMewVzxh1gN1DVw4-jkyCZtFAb75oby7AbCxzA/exec';
  const REGISTRATION_TOKEN = 'jlu@2026conferencesummit';
  const LOCAL_REG_STORAGE_KEY = 'jlu_summit_2026_registrations';

  const rsvpErrorEl = document.getElementById('rsvp-error');
  const rsvpSubmitBtn = document.getElementById('rsvp-submit-btn');
  const rsvpSubmitLabel = document.getElementById('rsvp-submit-label');
  const ticketStatusBadge = document.getElementById('ticket-status-badge');

  function showRsvpError(msg) {
    if (!rsvpErrorEl) return;
    rsvpErrorEl.textContent = msg;
    rsvpErrorEl.classList.remove('hidden');
  }

  function clearRsvpError() {
    if (!rsvpErrorEl) return;
    rsvpErrorEl.textContent = '';
    rsvpErrorEl.classList.add('hidden');
  }

  function normalizePhoneKey(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    return digits.length > 10 ? digits.slice(-10) : digits;
  }

  function submitRegistrationLocally(payload) {
    let records = [];
    try {
      records = JSON.parse(localStorage.getItem(LOCAL_REG_STORAGE_KEY) || '[]');
      if (!Array.isArray(records)) records = [];
    } catch (_) {
      records = [];
    }

    const normEmail = payload.email.toLowerCase();
    const normPhone = normalizePhoneKey(payload.phone);

    const existing = records.find((item) =>
      (item.email && item.email.toLowerCase() === normEmail) ||
      (normPhone && item.phone && normalizePhoneKey(item.phone) === normPhone)
    );

    if (existing) {
      return { ok: true, duplicate: true, ...existing };
    }

    const ticketId = 'JLU-LS-' + Math.floor(100000 + Math.random() * 900000);
    const entry = {
      ticketId,
      name: payload.name,
      email: normEmail,
      phone: payload.phone,
      role: payload.role,
      city: payload.city
    };
    records.push(entry);
    try {
      localStorage.setItem(LOCAL_REG_STORAGE_KEY, JSON.stringify(records));
    } catch (_) {
      // Ignore storage quota issues in private browsing
    }
    return { ok: true, duplicate: false, ...entry };
  }

  async function submitRegistrationToEndpoint(payload) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(REGISTRATION_ENDPOINT, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...payload, token: REGISTRATION_TOKEN }),
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error('Registration service returned an error.');
      }
      return await response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }

  let isSubmittingRsvp = false;

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isSubmittingRsvp) return;
      clearRsvpError();

      const gotchaEl = document.getElementById('rsvp-gotcha');
      if (gotchaEl && gotchaEl.value.trim() !== '') {
        showRsvpError('Unable to submit form.');
        return;
      }

      const cleanInput = (val) => String(val || '').replace(/[\x00-\x1F\x7F\u200B-\u200D\uFEFF]/g, ' ').trim();
      const name = cleanInput(document.getElementById('rsvp-name').value);
      const email = cleanInput(document.getElementById('rsvp-email').value).toLowerCase();
      const phoneEl = document.getElementById('rsvp-phone');
      const roleEl = document.getElementById('rsvp-role');
      const cityEl = document.getElementById('rsvp-city');

      const phone = phoneEl ? cleanInput(phoneEl.value) : '';
      const role = roleEl ? cleanInput(roleEl.value) : 'Delegate';
      const city = cityEl ? cleanInput(cityEl.value) : '';

      if (name.length < 2 || name.length > 120) {
        showRsvpError('Please enter your full name (2–120 characters).');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160) {
        showRsvpError('Please enter a valid email address.');
        return;
      }
      const phoneDigits = phone.replace(/\D/g, '').length;
      if (phoneDigits < 7 || phoneDigits > 15) {
        showRsvpError('Please enter a valid phone number (7–15 digits).');
        return;
      }

      isSubmittingRsvp = true;
      if (rsvpSubmitBtn) rsvpSubmitBtn.disabled = true;
      if (rsvpSubmitLabel) rsvpSubmitLabel.textContent = 'Submitting...';

      try {
        const elapsedMs = Date.now() - rsvpOpenedAt;
        const payload = { name, email, phone, role, city, _gotcha: '', _elapsedMs: elapsedMs };
        const result = REGISTRATION_ENDPOINT
          ? await submitRegistrationToEndpoint(payload)
          : submitRegistrationLocally(payload);

        if (!result || !result.ok) {
          showRsvpError((result && result.error) || 'Could not complete registration. Please try again.');
          return;
        }

        const passId = result.ticketId;
        const passName = result.name || name;
        const passEmail = result.email || email;
        const passPhone = result.phone || phone;
        const passRole = result.role || role;
        const passCity = result.city !== undefined ? result.city : city;

        const pageUrl = window.location.origin !== 'null'
          ? `${window.location.origin}${window.location.pathname}`
          : window.location.href.split('#')[0].split('?')[0];

        const qrPayload = [
          'JLU Leadership Summit 2026',
          `Pass ID: ${passId}`,
          `Name: ${passName}`,
          `Category: ${passRole}`,
          passCity ? `City: ${passCity}` : '',
          `Email: ${passEmail}`,
          `Phone: ${passPhone}`,
          '26 Nov 2026 | JLU SEH, Chandanpura, Bhopal',
          pageUrl
        ].filter(Boolean).join('\n');
        drawQrCode(ticketQrCanvas, qrPayload);

        const orgParts = [passRole, passCity].filter(Boolean);
        const contactParts = [passEmail, passPhone].filter(Boolean);

        document.getElementById('ticket-name').textContent = passName;
        document.getElementById('ticket-email').textContent = contactParts.join(' · ');
        document.getElementById('ticket-org').textContent = orgParts.join(' · ') || 'Official Delegate';
        document.getElementById('ticket-id').textContent = passId;

        if (ticketStatusBadge) {
          ticketStatusBadge.textContent = result.duplicate
            ? '✓ Already Registered · Existing Pass'
            : '✓ Registration Confirmed';
        }

        rsvpForm.classList.add('hidden');
        ticketConfirmation.classList.remove('hidden');

        showToast(
          result.duplicate
            ? 'Already registered — showing your existing pass.'
            : 'Registration confirmed for 26 November 2026!'
        );
      } catch (err) {
        const isTimeout = err && err.name === 'AbortError';
        showRsvpError(
          isTimeout
            ? 'Request timed out. Please check your connection and try again.'
            : 'Could not reach registration server. Please try again.'
        );
      } finally {
        isSubmittingRsvp = false;
        if (rsvpSubmitBtn) rsvpSubmitBtn.disabled = false;
        if (rsvpSubmitLabel) rsvpSubmitLabel.textContent = 'Complete Registration';
      }
    });
  }

  const printTicketBtn = document.getElementById('print-ticket-btn');
  if (printTicketBtn) {
    printTicketBtn.addEventListener('click', () => window.print());
  }

  const downloadTicketBtn = document.getElementById('download-ticket-btn');
  if (downloadTicketBtn) {
    downloadTicketBtn.addEventListener('click', () => {
      const passId = (document.getElementById('ticket-id')?.textContent || 'JLU-LS-PASS').trim();
      const passName = (document.getElementById('ticket-name')?.textContent || 'Delegate').trim();
      const passOrg = (document.getElementById('ticket-org')?.textContent || '').trim();
      const passEmail = (document.getElementById('ticket-email')?.textContent || '').trim();

      const canvas = document.createElement('canvas');
      const W = 900;
      const H = 430;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      // Card background & outer border
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#060a24';
      ctx.fillRect(0, 0, W, 16);
      ctx.fillStyle = '#0018f9';
      ctx.fillRect(0, 16, W, 6);
      ctx.strokeStyle = '#dce2f5';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, W - 2, H - 2);

      // Header kicker + title
      ctx.fillStyle = '#0018f9';
      ctx.font = '700 16px Montserrat, Inter, sans-serif';
      ctx.fillText('JLU LEADERSHIP SUMMIT 2026 · OFFICIAL ENTRY PASS', 44, 64);

      // Pass ID pill
      ctx.fillStyle = '#f6f8ff';
      ctx.fillRect(44, 86, 220, 38);
      ctx.strokeStyle = '#0018f9';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(44, 86, 220, 38);
      ctx.fillStyle = '#0018f9';
      ctx.font = '800 18px Montserrat, Inter, sans-serif';
      ctx.fillText(passId, 58, 111);

      // Delegate details
      ctx.fillStyle = '#060a24';
      ctx.font = '800 32px Montserrat, Inter, sans-serif';
      ctx.fillText(passName.slice(0, 32), 44, 178);

      ctx.fillStyle = '#475569';
      ctx.font = '600 19px Inter, sans-serif';
      ctx.fillText(passOrg.slice(0, 48), 44, 214);

      ctx.fillStyle = '#64748b';
      ctx.font = '500 16px Inter, sans-serif';
      ctx.fillText(passEmail.slice(0, 56), 44, 246);

      // Divider
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(44, 290);
      ctx.lineTo(540, 290);
      ctx.stroke();

      // Date & Venue footer
      ctx.fillStyle = '#060a24';
      ctx.font = '700 16px Montserrat, Inter, sans-serif';
      ctx.fillText('26 November 2026  ·  09:30 AM – 01:30 PM', 44, 328);
      ctx.fillStyle = '#475569';
      ctx.font = '500 15px Inter, sans-serif';
      ctx.fillText('Jagran Lakecity University SEH, Chandanpura, Bhopal', 44, 356);

      // QR frame on right
      const qrBoxSize = 270;
      const qrX = W - qrBoxSize - 48;
      const qrY = 80;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrX, qrY, qrBoxSize, qrBoxSize);
      ctx.strokeStyle = '#dce2f5';
      ctx.lineWidth = 2;
      ctx.strokeRect(qrX, qrY, qrBoxSize, qrBoxSize);

      if (ticketQrCanvas && ticketQrCanvas.width > 0) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(ticketQrCanvas, qrX + 12, qrY + 12, qrBoxSize - 24, qrBoxSize - 24);
      }

      const link = document.createElement('a');
      link.download = `${passId.replace(/[^A-Za-z0-9_-]/g, '') || 'JLU-Summit-Pass'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('Pass image downloaded!');
    });
  }

  const resetRsvpBtn = document.getElementById('reset-rsvp-btn');
  if (resetRsvpBtn) {
    resetRsvpBtn.addEventListener('click', () => {
      clearRsvpError();
      ticketConfirmation.classList.add('hidden');
      rsvpForm.classList.remove('hidden');
      rsvpForm.reset();
    });
  }

  function drawQrCode(canvas, text) {
    if (!canvas || typeof window.qrcode !== 'function') return;
    const qr = window.qrcode(0, 'M');
    qr.addData(text);
    qr.make();

    const count = qr.getModuleCount();
    const quiet = 2; // quiet-zone modules around the QR code
    const totalModules = count + quiet * 2;
    const scale = Math.max(4, Math.floor(240 / totalModules));
    const size = totalModules * scale;

    canvas.width = size;
    canvas.height = size;
    canvas.style.width = '112px';
    canvas.style.height = '112px';

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const isFinderCenter = (r, c) =>
      (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
      (r >= 2 && r <= 4 && c >= count - 5 && c <= count - 3) ||
      (r >= count - 5 && r <= count - 3 && c >= 2 && c <= 4);

    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillStyle = isFinderCenter(r, c) ? '#0018f9' : '#060a24';
          ctx.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
        }
      }
    }
  }

  // ==========================================
  // 7. FAQ ACCORDION
  // ==========================================
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      if (!item) return;
      const body = item.querySelector('.faq-body');
      const icon = item.querySelector('.faq-icon');
      const isOpen = !body.classList.contains('hidden');

      document.querySelectorAll('.faq-body').forEach(b => b.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');

      if (!isOpen) {
        body.classList.remove('hidden');
        if (icon) icon.textContent = '−';
      }
    });
  });

  // ==========================================
  // 8. FLOATING BAR HERO SCROLL TRIGGER
  // ==========================================
  const floatingNav = document.getElementById('floating-nav');
  const heroSection = document.getElementById('hero');

  if (floatingNav && heroSection) {
    const updateNavVisibility = () => {
      const heroRect = heroSection.getBoundingClientRect();
      if (heroRect.bottom <= 80) {
        floatingNav.classList.add('nav-visible');
      } else {
        floatingNav.classList.remove('nav-visible');
      }
    };

    window.addEventListener('scroll', updateNavVisibility, { passive: true });
    window.addEventListener('resize', updateNavVisibility, { passive: true });
    updateNavVisibility();
  }

  // ==========================================
  // 9. MOBILE HAMBURGER MENU
  // ==========================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileMenuIconOpen = document.getElementById('mobile-menu-icon-open');
  const mobileMenuIconClose = document.getElementById('mobile-menu-icon-close');

  const setMobileMenuOpen = (isOpen) => {
    if (!mobileNavMenu || !mobileMenuToggle) return;
    mobileNavMenu.classList.toggle('hidden', !isOpen);
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    if (mobileMenuIconOpen) mobileMenuIconOpen.classList.toggle('hidden', isOpen);
    if (mobileMenuIconClose) mobileMenuIconClose.classList.toggle('hidden', !isOpen);
  };

  if (mobileMenuToggle && mobileNavMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isCurrentlyOpen = !mobileNavMenu.classList.contains('hidden');
      setMobileMenuOpen(!isCurrentlyOpen);
    });

    mobileNavMenu.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => setMobileMenuOpen(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileNavMenu.classList.contains('hidden')) {
        setMobileMenuOpen(false);
      }
    });
  }

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Initialize Timeline
  renderTimeline();
});
