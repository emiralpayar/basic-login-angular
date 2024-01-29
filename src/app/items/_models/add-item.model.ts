export interface AddItemModel {
    title: string;
    description?: string;
    birthDate?: string;      // Assuming Doğum Tarihi (Date of Birth) is a string representing a date
    time?: string;           // Assuming Saati (Time) is a string
    occupation?: string;     // Meslek (Occupation)
    maritalStatus?: string;  // Medeni Durum (Marital Status)
}
