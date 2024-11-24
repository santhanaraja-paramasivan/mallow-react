/* eslint-disable @typescript-eslint/no-explicit-any */

type CommonCollection = {
    [key: string]: string;
};
interface ColumnDetails {
    headerName: string;
    field: string;
    cellRenderer: (params: { value?: any }) => JSX.Element;
}
interface InputConfig {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    span: number;
    options?: any;
    optionName?: keyof DropdownOptions;
    disabled?: boolean;
    value?: boolean;
}

interface complexDataType {
    key: React.Key;
    captionName: string;
    captionID: string;
    directoryCode: string;
    subsection: string;
}
interface SelectOptionType {
    name: string;
    value: string | number;
    field?: string | number | any;
    allFields?: any;
}
interface FormData {
    [key: string]: any;
}
interface FormPropType {
    create?: boolean;
}
interface CheckBoxType {
    value: string;
    name: string;
    checked?: boolean;
}
interface GetListingPagination {
    query: string;
    page: number;
    size: number;
}
interface CustomRowData {
    captionText: string;
    indent: string | number;
    type: string;
    updated: string;
    ban?: string;
    mtn?: string;
    number?: string;
}
interface DropdownOptions {
    textTypes: any[];
    directories: any[];
    directorySections: any[];
    listingStatus: any[];
    cities: any[];
    states: any[];
    yphVerbiage: any[];
    listingType: any[];
  }

interface AddListingPayload {
    parentOf: any[];
    listingId: string;
    billingAccountNumber: string;
    styleCode: string;
    displayOrder: string;
    directoryCode: string;
    subSection: string;
    listingType: string;
    listingStatus: string;
    accountType: string;
    indentLevel: string;
    displayText: string;
    displayNumber: string;
    mainTelephoneNumber: string | null;
    recordType: string;
    directoryName: string;
    textType: string;
    yphCode: string | null;
    listedLastName: string;
    listedFirstName: string | null;
    nonStandardTN: string | null;
    orderNumber: string;
    versionNumber: string | null;
    houseNo: string;
    houseNoPrefix: string | null;
    addressTitle1: string | null;
    addressTitle2: string | null;
    orderAction: string;
    houseNoSuffix: string | null;
    streetDirectional: string | null;
    streetName: string;
    streetSuffix: string | null;
    location: string | null;
    zipCode: string;
    state: string;
    city: string;
    localExchange: string | null;
    captionId: string;
    detailId: string;
    designation: string | null;
    lineage: string | null;
    nickname: string | null;
    title: string | null;
    degree: string | null;
    pla: string | null;
    listedAddress: string | null;
    instructed: boolean;
    omitAddress: boolean;
    doNotSellListing: boolean;
    omitTN: boolean;
    doNotMail: boolean;
    doNotTeleMarket: boolean;
    localWholeSale: boolean;
    listingPublished: boolean;
    reviewComments: string;
    recArea: string;
}

export type {
    CommonCollection,
    ColumnDetails,
    InputConfig,
    AddListingPayload,
    CheckBoxType,
    CustomRowData,
    FormData,
    FormPropType,
    SelectOptionType,
    complexDataType,
    GetListingPagination,
    DropdownOptions
}