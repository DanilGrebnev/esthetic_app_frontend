import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Render button on page', () => {
    it('renders a heading', () => {
        const testBtnTest = 'Test bntn test'
        render(<Button>{testBtnTest}</Button>)

        const button = screen.getByText(testBtnTest)

        expect(button).toBeInTheDocument()
    })
})
