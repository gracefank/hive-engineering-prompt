import { render, screen, fireEvent } from '@testing-library/react';
import MultiSelectDropdown from './MultiSelectDropdown';

describe('MultiSelectDropdown', () => {
  test('displays placeholder by default', () => {
    render(<MultiSelectDropdown options={['Option 1', 'Option 2', 'Option 3']} multiSelect />);
    const dropdownHeader = screen.getByRole('button', { name: /select option/i });
    expect(dropdownHeader).toHaveTextContent('Select option(s)');
  });

  test('displays selected options when options are selected', () => {
    render(<MultiSelectDropdown options={['Option 1', 'Option 2', 'Option 3']} multiSelect />);
    const dropdownHeader = screen.getByRole('button', { name: /select option/i });

    fireEvent.click(dropdownHeader);
    const option1 = screen.getByRole('checkbox', { name: /option 1/i });

    fireEvent.click(option1);
    expect(dropdownHeader).toHaveTextContent('Option 1');

    const option2 = screen.getByRole('checkbox', { name: /option 2/i });
    fireEvent.click(option2);
    expect(dropdownHeader).toHaveTextContent('Option 1, Option 2');
  });

  test('calls onChange with selected options', () => {
    const handleChange = jest.fn();
    render(
      <MultiSelectDropdown options={['Option 1', 'Option 2', 'Option 3']} multiSelect onChange={handleChange} />
    );
    const dropdownHeader = screen.getByRole('button', { name: /select option/i });

    fireEvent.click(dropdownHeader);
    const option1 = screen.getByRole('checkbox', { name: /option 1/i });
    const option2 = screen.getByRole('checkbox', { name: /option 2/i });
    const option3 = screen.getByRole('checkbox', { name: /option 3/i });

    fireEvent.click(option1);
    expect(handleChange).toHaveBeenCalledWith(['Option 1']);

    fireEvent.click(option2);
    expect(handleChange).toHaveBeenCalledWith(['Option 1', 'Option 2']);

    fireEvent.click(option3);
    expect(handleChange).toHaveBeenCalledWith(['Option 1', 'Option 2', 'Option 3']);
  });

  test('toggles select/deselect all options', () => {
    const handleChange = jest.fn();
    render(
      <MultiSelectDropdown options={['Option 1', 'Option 2', 'Option 3']} multiSelect onChange={handleChange} />
    );
    const dropdownHeader = screen.getByRole('button', { name: /select option/i });
    const toggleButton = screen.getByRole('button', { name: /select all/i });

    fireEvent.click(dropdownHeader);
    expect(toggleButton).toHaveTextContent('Select All');

    fireEvent.click(toggleButton);
    expect(handleChange).toHaveBeenCalledWith(['Option 1', 'Option 2', 'Option 3']);

    fireEvent.click(toggleButton);
    expect(handleChange).toHaveBeenCalledWith([]);

    fireEvent.click(toggleButton);
    expect(handleChange).toHaveBeenCalledWith(['Option 1', 'Option 2', 'Option 3']);
  });
});
