export const ALL_ROUTES = [
    { id: 'DASHBOARD', name: 'Dashboard', authorizedRouted: true, path: '/dashboard', icon: 'ri-home-line' },
    // { id: 'DASHBOARD', name: 'Dashboard', authorizedRouted: true, path: '/dashboard' },
    { id: 'STUDENTS', name: 'Students', authorizedRouted: true, path: '/students', icon: 'ri-graduation-cap-line' },
    { id: 'TEACHERS', name: 'Teachers', authorizedRouted: true, path: '/teachers', icon: 'ri-presentation-line' },
    { id: 'PARENTS', name: 'Parents', authorizedRouted: true, path: '/parents', icon: 'ri-team-line' },
    { id: 'LIBRARY', name: 'Library', authorizedRouted: true, path: '/library', icon: 'ri-book-2-line' },
    { id: 'CLASS', name: 'Class', authorizedRouted: true, path: '/class', icon: 'ri-presentation-line' },
    { id: 'EXAM', name: 'Exam', authorizedRouted: true, path: '/exam', icon: 'ri-file-line' },
    { id: 'EVENTS', name: 'Events', authorizedRouted: true, path: '/events', icon: 'ri-calendar-line' },
    { id: 'GALLERY', name: 'Gallery', authorizedRouted: true, path: '/gallery', icon: "ri-gallery-line" },
    { id: 'TRANSPORT', name: 'Transport', authorizedRouted: true, path: '/transport', icon: 'ri-bus-line' },
    // { id: 'HOSTEL', name: 'Hostel', authorizedRouted: true, path: '/hostel' , icon:'home-alt'},
    { id: 'NOTICE', name: 'Notice', authorizedRouted: true, path: '/notice', icon: "ri-sticky-note-add-line" },
    { id: 'MESSAGE', name: 'Message', authorizedRouted: true, path: '/message', icon: 'ri-mail-line' },
    { id: 'ACCOUNT', name: 'Account', authorizedRouted: true, path: '/profile', icon: 'ri-user-line' },

    { id: 'LOGIN', name: 'Login', path: '/login', authorizedRouted: false },
    { id: 'REGISTER', name: 'Register', path: '/signup', authorizedRouted: false },

]

export const OTHER_ROUTES = [
    { id: 'STUDENT', name: 'Student Profile', authorizedRouted: true, path: '/student', icon: 'users-alt' },
]