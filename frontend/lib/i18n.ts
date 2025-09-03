'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'fr';

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'quickcheck-language',
    }
  )
);

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    kioskDemo: 'Kiosk Demo',
    adminDemo: 'Admin Demo',
    login: 'Login',
    logout: 'Logout',
    
    // Landing Page
    heroTitle: 'Smart Digital Waitlists for',
    heroTitleHighlight: 'Modern Restaurants',
    heroSubtitle: 'Self check-in kiosks, instant SMS notifications, and real-time dashboards that transform your restaurant\'s customer experience.',
    tryKioskDemo: 'Try Kiosk Demo',
    viewAdminDashboard: 'View Admin Dashboard',
    
    // Features
    featuresTitle: 'Everything You Need to Manage Waitlists',
    featuresSubtitle: 'From customer check-in to table management, QuickCheck handles it all seamlessly.',
    selfCheckIn: 'Self Check-In',
    selfCheckInDesc: 'Customers can join the waitlist themselves with our easy-to-use kiosk interface.',
    smsNotifications: 'SMS Notifications',
    smsNotificationsDesc: 'Automatic text messages keep customers informed about their wait time and table status.',
    realTimeDashboard: 'Real-Time Dashboard',
    realTimeDashboardDesc: 'Manage your entire waitlist and table status from one comprehensive dashboard.',
    smartAnalytics: 'Smart Analytics',
    smartAnalyticsDesc: 'Track wait times, customer satisfaction, and optimize your restaurant\'s flow.',
    
    // How It Works
    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'Three simple steps to revolutionize your restaurant\'s waitlist experience.',
    customerCheckIn: 'Customer Check-In',
    customerCheckInDesc: 'Customers use the self-service kiosk to join the waitlist with their party size, name, and phone number.',
    automaticNotifications: 'Automatic Notifications',
    automaticNotificationsDesc: 'When tables are ready, customers receive instant SMS notifications with response confirmations.',
    seamlessSeating: 'Seamless Seating',
    seamlessSeatingDesc: 'Staff manage the entire process through an intuitive dashboard with real-time updates and analytics.',
    
    // Testimonials
    testimonialsTitle: 'Loved by Restaurant Owners',
    
    // Auth
    welcomeToQuickCheck: 'Welcome to QuickCheck',
    enterMobileNumber: 'Enter your mobile number to get started',
    mobileNumber: 'Mobile Number',
    accessType: 'Access Type',
    selectAccessType: 'Select your access type',
    guestJoinWaitlist: 'Guest - Join Waitlist',
    adminRestaurantDashboard: 'Admin - Restaurant Dashboard',
    continue: 'Continue',
    verifyYourNumber: 'Verify Your Number',
    weveSentCode: 'We\'ve sent a 4-digit code to',
    enterOtpCode: 'Enter OTP Code',
    demoMode: 'Demo Mode',
    yourOtpIs: 'Your OTP is:',
    verifyAndContinue: 'Verify & Continue',
    backToLogin: 'Back to Login',
    accessing: 'Accessing:',
    panel: 'Panel',
    didntReceiveCode: 'Didn\'t receive the code? Resend',
    
    // Kiosk
    welcomeJoinWaitlist: 'Welcome! Join the waitlist for Bella Vista',
    loggedInAs: 'Logged in as:',
    howManyPeople: 'How many people?',
    selectPartySize: 'Select your party size to get started',
    yourInformation: 'Your information',
    wellTextYou: 'We\'ll text you when your table is ready',
    yourName: 'Your name',
    enterYourName: 'Enter your name',
    phoneNumber: 'Phone number',
    back: 'Back',
    confirmYourDetails: 'Confirm your details',
    doubleCheckEverything: 'Please double-check everything looks correct',
    partySize: 'Party size:',
    people: 'people',
    name: 'Name:',
    phone: 'Phone:',
    editDetails: 'Edit Details',
    joinWaitlist: 'Join Waitlist',
    youreInLine: 'You\'re in line!',
    weveSentTextMessage: 'We\'ve sent you a text message. Keep your phone handy!',
    currentWaitTime: 'Current wait time',
    minutes: 'minutes',
    addAnotherParty: 'Add Another Party',
    
    // SMS Preview
    smsPreview: 'SMS Preview',
    tableReadyNotification: 'Table Ready Notification',
    customerResponse: 'Customer Response',
    reminderIfNoResponse: 'Reminder (if no response)',
    
    // Admin Dashboard
    totalWaiting: 'Total Waiting',
    activeInQueue: 'Active in queue',
    avgWaitTime: 'Avg Wait Time',
    currentEstimate: 'Current estimate',
    availableTables: 'Available Tables',
    readyToSeat: 'Ready to seat',
    todaysSeated: 'Today\'s Seated',
    totalCustomers: 'Total customers',
    activeWaitlist: 'Active Waitlist',
    manageCustomerQueue: 'Manage customer queue and table assignments',
    noCustomersWaiting: 'No customers waiting',
    customersWillAppear: 'Customers will appear here when they check in at the kiosk.',
    partyOf: 'Party of',
    notify: 'Notify',
    markSeated: 'Mark Seated',
    cancel: 'Cancel',
    inQueue: 'In Queue',
    tableReady: 'Table Ready',
    seated: 'Seated',
    cancelled: 'Cancelled',
    noShow: 'No Show',
    
    // Common
    pleaseEnterName: 'Please enter your name',
    pleaseEnterPhone: 'Please enter your phone number',
    pleaseEnterValidPhone: 'Please enter a valid phone number',
    pleaseSelectAccessType: 'Please select your access type',
    guest: 'guest',
    admin: 'admin',
    verifying: 'Verifying...',
    invalidOtp: 'Invalid OTP. Please try again.',
    pleaseEnterCompleteOtp: 'Please enter the complete 4-digit OTP',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    kioskDemo: 'Démo Kiosque',
    adminDemo: 'Démo Admin',
    login: 'Connexion',
    logout: 'Déconnexion',
    
    // Landing Page
    heroTitle: 'Listes d\'attente numériques intelligentes pour',
    heroTitleHighlight: 'Restaurants Modernes',
    heroSubtitle: 'Kiosques d\'enregistrement automatique, notifications SMS instantanées et tableaux de bord en temps réel qui transforment l\'expérience client de votre restaurant.',
    tryKioskDemo: 'Essayer la Démo Kiosque',
    viewAdminDashboard: 'Voir le Tableau de Bord Admin',
    
    // Features
    featuresTitle: 'Tout ce dont vous avez besoin pour gérer les listes d\'attente',
    featuresSubtitle: 'De l\'enregistrement client à la gestion des tables, QuickCheck gère tout de manière transparente.',
    selfCheckIn: 'Enregistrement Automatique',
    selfCheckInDesc: 'Les clients peuvent rejoindre la liste d\'attente eux-mêmes avec notre interface de kiosque facile à utiliser.',
    smsNotifications: 'Notifications SMS',
    smsNotificationsDesc: 'Les messages texte automatiques tiennent les clients informés de leur temps d\'attente et du statut de leur table.',
    realTimeDashboard: 'Tableau de Bord en Temps Réel',
    realTimeDashboardDesc: 'Gérez toute votre liste d\'attente et le statut des tables depuis un tableau de bord complet.',
    smartAnalytics: 'Analyses Intelligentes',
    smartAnalyticsDesc: 'Suivez les temps d\'attente, la satisfaction client et optimisez le flux de votre restaurant.',
    
    // How It Works
    howItWorksTitle: 'Comment ça marche',
    howItWorksSubtitle: 'Trois étapes simples pour révolutionner l\'expérience de liste d\'attente de votre restaurant.',
    customerCheckIn: 'Enregistrement Client',
    customerCheckInDesc: 'Les clients utilisent le kiosque en libre-service pour rejoindre la liste d\'attente avec leur taille de groupe, nom et numéro de téléphone.',
    automaticNotifications: 'Notifications Automatiques',
    automaticNotificationsDesc: 'Quand les tables sont prêtes, les clients reçoivent des notifications SMS instantanées avec confirmations de réponse.',
    seamlessSeating: 'Placement Transparent',
    seamlessSeatingDesc: 'Le personnel gère tout le processus via un tableau de bord intuitif avec mises à jour en temps réel et analyses.',
    
    // Testimonials
    testimonialsTitle: 'Aimé par les Propriétaires de Restaurants',
    
    // Auth
    welcomeToQuickCheck: 'Bienvenue sur QuickCheck',
    enterMobileNumber: 'Entrez votre numéro de mobile pour commencer',
    mobileNumber: 'Numéro de Mobile',
    accessType: 'Type d\'Accès',
    selectAccessType: 'Sélectionnez votre type d\'accès',
    guestJoinWaitlist: 'Invité - Rejoindre la Liste d\'Attente',
    adminRestaurantDashboard: 'Admin - Tableau de Bord Restaurant',
    continue: 'Continuer',
    verifyYourNumber: 'Vérifiez Votre Numéro',
    weveSentCode: 'Nous avons envoyé un code à 4 chiffres à',
    enterOtpCode: 'Entrez le Code OTP',
    demoMode: 'Mode Démo',
    yourOtpIs: 'Votre OTP est :',
    verifyAndContinue: 'Vérifier et Continuer',
    backToLogin: 'Retour à la Connexion',
    accessing: 'Accès :',
    panel: 'Panneau',
    didntReceiveCode: 'Vous n\'avez pas reçu le code ? Renvoyer',
    
    // Kiosk
    welcomeJoinWaitlist: 'Bienvenue ! Rejoignez la liste d\'attente pour Bella Vista',
    loggedInAs: 'Connecté en tant que :',
    howManyPeople: 'Combien de personnes ?',
    selectPartySize: 'Sélectionnez la taille de votre groupe pour commencer',
    yourInformation: 'Vos informations',
    wellTextYou: 'Nous vous enverrons un SMS quand votre table sera prête',
    yourName: 'Votre nom',
    enterYourName: 'Entrez votre nom',
    phoneNumber: 'Numéro de téléphone',
    back: 'Retour',
    confirmYourDetails: 'Confirmez vos détails',
    doubleCheckEverything: 'Veuillez vérifier que tout est correct',
    partySize: 'Taille du groupe :',
    people: 'personnes',
    name: 'Nom :',
    phone: 'Téléphone :',
    editDetails: 'Modifier les Détails',
    joinWaitlist: 'Rejoindre la Liste d\'Attente',
    youreInLine: 'Vous êtes en file !',
    weveSentTextMessage: 'Nous vous avons envoyé un message texte. Gardez votre téléphone à portée de main !',
    currentWaitTime: 'Temps d\'attente actuel',
    minutes: 'minutes',
    addAnotherParty: 'Ajouter un Autre Groupe',
    
    // SMS Preview
    smsPreview: 'Aperçu SMS',
    tableReadyNotification: 'Notification Table Prête',
    customerResponse: 'Réponse Client',
    reminderIfNoResponse: 'Rappel (si pas de réponse)',
    
    // Admin Dashboard
    totalWaiting: 'Total en Attente',
    activeInQueue: 'Actifs en file',
    avgWaitTime: 'Temps d\'Attente Moyen',
    currentEstimate: 'Estimation actuelle',
    availableTables: 'Tables Disponibles',
    readyToSeat: 'Prêtes à accueillir',
    todaysSeated: 'Assis Aujourd\'hui',
    totalCustomers: 'Total clients',
    activeWaitlist: 'Liste d\'Attente Active',
    manageCustomerQueue: 'Gérer la file d\'attente client et les affectations de tables',
    noCustomersWaiting: 'Aucun client en attente',
    customersWillAppear: 'Les clients apparaîtront ici quand ils s\'enregistreront au kiosque.',
    partyOf: 'Groupe de',
    notify: 'Notifier',
    markSeated: 'Marquer Assis',
    cancel: 'Annuler',
    inQueue: 'En File',
    tableReady: 'Table Prête',
    seated: 'Assis',
    cancelled: 'Annulé',
    noShow: 'Absent',
    
    // Common
    pleaseEnterName: 'Veuillez entrer votre nom',
    pleaseEnterPhone: 'Veuillez entrer votre numéro de téléphone',
    pleaseEnterValidPhone: 'Veuillez entrer un numéro de téléphone valide',
    pleaseSelectAccessType: 'Veuillez sélectionner votre type d\'accès',
    guest: 'invité',
    admin: 'admin',
    verifying: 'Vérification...',
    invalidOtp: 'OTP invalide. Veuillez réessayer.',
    pleaseEnterCompleteOtp: 'Veuillez entrer le code OTP complet à 4 chiffres',
  },
};

export function useTranslation() {
  const { language } = useI18nStore();
  
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  return { t, language };
}