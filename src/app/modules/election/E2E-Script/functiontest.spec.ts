import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import { ElectionComponent } from '../election/election.component';
import { ElectionService } from '../api/election.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

jest.mock('../api/election.service');
jest.mock('ng-zorro-antd/notification');

describe('ElectionComponent', () => {
  let electionServiceMock: jest.Mocked<ElectionService>;
  let notificationServiceMock: jest.Mocked<NzNotificationService>;

  beforeEach(async () => {
    electionServiceMock = {
      getPresElections: jest.fn(),
      getPrinters: jest.fn(),
      addPrinter: jest.fn(),
      installDriversFromJson: jest.fn(),
      deletePrinter: jest.fn(),
    } as any;

    notificationServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
    } as any;

    await render(ElectionComponent, {
      imports: [FormsModule],
      providers: [
        { provide: ElectionService, useValue: electionServiceMock },
        { provide: NzNotificationService, useValue: notificationServiceMock },
      ],
    });
  });

  it('should create', () => {
    expect(screen.getByText('Election')).toBeTruthy();
  });

  it('should load elections on init', async () => {
    const mockElections = [
      { electionYear: '2020', candidate: 'John Doe', votes: '1000', winnerLoserIndic: 'Winner' },
      { electionYear: '2020', candidate: 'Jane Smith', votes: '900', winnerLoserIndic: 'Loser' },
    ];
    electionServiceMock.getPresElections.mockReturnValue(of(mockElections));

    await waitFor(() => {
      expect(electionServiceMock.getPresElections).toHaveBeenCalled();
    });

    // Since the component uses removeDuplicates, we expect only one entry
    expect(screen.getAllByRole('row').length).toBe(2); // 1 header + 1 data row
  });

  it('should load printers on init', async () => {
    const mockPrinters = [
      { id: 1, name: 'Printer1', ip: '192.168.1.1' },
      { id: 2, name: 'Printer2', ip: '192.168.1.2' },
    ];
    electionServiceMock.getPrinters.mockReturnValue(of(mockPrinters));

    await waitFor(() => {
      expect(electionServiceMock.getPrinters).toHaveBeenCalled();
    });

    expect(screen.getAllByRole('row').length).toBe(3); // 1 header + 2 data rows
  });

  it('should filter data on search', async () => {
    const mockElections = [
      { electionYear: '2020', candidate: 'John Doe', votes: '1000', winnerLoserIndic: 'Winner' },
      { electionYear: '2016', candidate: 'Jane Smith', votes: '900', winnerLoserIndic: 'Loser' },
    ];
    electionServiceMock.getPresElections.mockReturnValue(of(mockElections));

    await waitFor(() => {
      expect(electionServiceMock.getPresElections).toHaveBeenCalled();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.input(searchInput, { target: { value: 'John' } });

    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(2); // 1 header + 1 filtered row
    });
  });

  it('should add printer successfully', async () => {
    const mockResponse = { success: true };
    electionServiceMock.addPrinter.mockReturnValue(of(mockResponse));

    const nameInput = screen.getByLabelText('Name:');
    const ipInput = screen.getByLabelText('IP:');
    const descriptionInput = screen.getByLabelText('Description:');
    const locationInput = screen.getByLabelText('Location:');
    const addButton = screen.getByText('Add Printer');

    fireEvent.input(nameInput, { target: { value: 'Test Printer' } });
    fireEvent.input(ipInput, { target: { value: '192.168.1.1' } });
    fireEvent.input(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.input(locationInput, { target: { value: 'Test Location' } });
    
    // Mock file input
    Object.defineProperty(addButton, 'files', {
      value: [new File([''], 'test.ppd', { type: 'application/octet-stream' })],
    });
    fireEvent.change(addButton);

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(electionServiceMock.addPrinter).toHaveBeenCalledWith(
        'Test Printer',
        '192.168.1.1',
        'Test Description',
        expect.any(String), // base64 string
        'Test Location'
      );
      expect(notificationServiceMock.success).toHaveBeenCalledWith('Success', 'Printer added successfully.');
    });
  });

  it('should handle error when adding printer', async () => {
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    electionServiceMock.addPrinter.mockReturnValue(throwError(() => errorResponse));

    const nameInput = screen.getByLabelText('Name:');
    const ipInput = screen.getByLabelText('IP:');
    const addButton = screen.getByText('Add Printer');

    fireEvent.input(nameInput, { target: { value: 'Test Printer' } });
    fireEvent.input(ipInput, { target: { value: '192.168.1.1' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(electionServiceMock.addPrinter).toHaveBeenCalled();
      expect(notificationServiceMock.error).toHaveBeenCalledWith('Error', 'An error occurred while adding the printer.');
    });
  });

  it('should delete printer successfully', async () => {
    const mockResponse = 'Printer deleted successfully';
    electionServiceMock.deletePrinter.mockReturnValue(of(mockResponse));

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(electionServiceMock.deletePrinter).toHaveBeenCalled();
      expect(notificationServiceMock.success).toHaveBeenCalledWith('Success', 'Printer deleted successfully.');
    });
  });

  it('should handle error when deleting printer', async () => {
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    electionServiceMock.deletePrinter.mockReturnValue(throwError(() => errorResponse));

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(electionServiceMock.deletePrinter).toHaveBeenCalled();
      expect(notificationServiceMock.error).toHaveBeenCalledWith('Error', 'An error occurred while deleting the printer.');
    });
  });

  it('should install drivers from JSON successfully', async () => {
    const mockResponse = 'Drivers installed successfully';
    electionServiceMock.installDriversFromJson.mockReturnValue(of(mockResponse));

    const installButton = screen.getByText('Install Drivers');
    fireEvent.click(installButton);

    await waitFor(() => {
      expect(electionServiceMock.installDriversFromJson).toHaveBeenCalled();
      expect(notificationServiceMock.success).toHaveBeenCalledWith('Success', 'Printers installation process completed');
    });
  });

  it('should handle error when installing drivers from JSON', async () => {
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    electionServiceMock.installDriversFromJson.mockReturnValue(throwError(() => errorResponse));

    const installButton = screen.getByText('Install Drivers');
    fireEvent.click(installButton);

    await waitFor(() => {
      expect(electionServiceMock.installDriversFromJson).toHaveBeenCalled();
      expect(notificationServiceMock.error).toHaveBeenCalledWith('Error', 'An error occurred while installing the drivers.');
    });
  });
});