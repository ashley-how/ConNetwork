export interface Event {
    id: string;
    name: string;
    location: string;
    details: string;
    startDate: Date;
    startTime: Date;
    endDate: Date;
    endTime: Date;
    participants: string[];
    createdBy: string;
    updatedBy: string;
}