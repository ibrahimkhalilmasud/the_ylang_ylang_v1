export interface NavItem {
  label: string
  href: string
}

// Restructured from the live site into an experience-led IA (brief §9/§11).
export const NAV: NavItem[] = [
  { label: 'The Villa', href: '/villa' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Dining', href: '/dining' },
  { label: 'Wellness', href: '/wellness' },
  { label: 'Celebrations', href: '/weddings' },
  { label: 'Location', href: '/location' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Rates', href: '/rates' },
]

export const RESERVE_HREF = '/book'
