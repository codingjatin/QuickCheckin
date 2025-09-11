import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useI18nStore } from '@/lib/i18n'

jest.mock('@/lib/i18n', () => ({
  useI18nStore: jest.fn(),
  useTranslation: () => ({ t: (key: string) => key }),
}))

const mockUseI18nStore = useI18nStore as jest.MockedFunction<typeof useI18nStore>

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockUseI18nStore.mockReturnValue({
      language: 'en',
      setLanguage: jest.fn(),
    })
  })

  it('renders the current language', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('opens dropdown when clicked', () => {
    render(<LanguageSwitcher />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('Français')).toBeInTheDocument()
  })

  it('calls setLanguage when language is selected', () => {
    const mockSetLanguage = jest.fn()
    mockUseI18nStore.mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    })

    render(<LanguageSwitcher />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    const frenchOption = screen.getByText('Français')
    fireEvent.click(frenchOption)

    expect(mockSetLanguage).toHaveBeenCalledWith('fr')
  })
})
