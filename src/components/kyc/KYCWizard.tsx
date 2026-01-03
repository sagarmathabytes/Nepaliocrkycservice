import { useState } from 'react';
import { StepProgress } from './StepProgress';
import { PersonalInfo } from './steps/PersonalInfo';
import { AddressDetails } from './steps/AddressDetails';
import { IdentificationDocs } from './steps/IdentificationDocs';
import { MinorDetails } from './steps/MinorDetails';
import { FamilyMembers } from './steps/FamilyMembers';
import { IncomeOccupation } from './steps/IncomeOccupation';
import { ComplianceRisk } from './steps/ComplianceRisk';
import { ForeignStatus } from './steps/ForeignStatus';
import { ResidenceVerification } from './steps/ResidenceVerification';
import { ReviewDeclaration } from './steps/ReviewDeclaration';
import { Building2 } from 'lucide-react';

export interface KYCData {
  // Personal Info
  fullNameEn?: string;
  fullNameNe?: string;
  dobBS?: string;
  dobAD?: string;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  education?: string;
  photograph?: string;
  branch?: string;
  
  // Address
  permanentAddress?: AddressData;
  presentAddress?: AddressData;
  mailingAddress?: AddressData;
  sameAsPermament?: boolean;
  residenceTel?: string;
  officeTel?: string;
  mobile?: string;
  email?: string;
  
  // Identification
  documents?: DocumentData[];
  isMinor?: boolean;
  
  // Minor Details
  minorBirthCert?: string;
  guardianId?: DocumentData;
  
  // Family
  familyMembers?: FamilyMember[];
  
  // Income
  incomeSource?: string[];
  occupations?: OccupationData[];
  annualTransaction?: string;
  
  // Compliance
  isGovEmployee?: boolean;
  isPEP?: boolean;
  isConvicted?: boolean;
  convictionDetails?: string;
  hasBeneficialOwner?: boolean;
  hasExistingAccount?: boolean;
  existingAccountNumber?: string;
  otherBankAccounts?: BankAccount[];
  
  // Foreign Status
  isForeigner?: boolean;
  foreignPassport?: string;
  foreignAddress?: string;
  foreignTel?: string;
  contactPersonAbroad?: string;
  visaIssue?: string;
  visaExpiry?: string;
  
  // Residence
  landlordName?: string;
  landlordAddress?: string;
  landlordContact?: string;
  mapLocation?: string;
  nearestLandmark?: string;
  distanceFromResidence?: string;
  
  // Declaration
  declarations?: boolean[];
  signature?: string;
  thumbImpression?: string;
}

export interface AddressData {
  houseNo?: string;
  tole?: string;
  ward?: string;
  municipality?: string;
  district?: string;
  province?: string;
}

export interface DocumentData {
  type: string;
  number?: string;
  issuedBy?: string;
  issueDate?: string;
  expiryDate?: string;
  confidence?: number;
  image?: string;
}

export interface FamilyMember {
  relation: string;
  fullName: string;
}

export interface OccupationData {
  institution?: string;
  nature?: string;
  address?: string;
  position?: string;
  income?: string;
}

export interface BankAccount {
  bankName?: string;
  accountNumber?: string;
  accountType?: string;
}

const steps = [
  { id: 1, title: 'Personal Information', component: PersonalInfo },
  { id: 2, title: 'Address Details', component: AddressDetails },
  { id: 3, title: 'Identification Documents', component: IdentificationDocs },
  { id: 4, title: 'Minor Details', component: MinorDetails, conditional: true },
  { id: 5, title: 'Family Members', component: FamilyMembers },
  { id: 6, title: 'Income & Occupation', component: IncomeOccupation },
  { id: 7, title: 'Compliance & Risk', component: ComplianceRisk },
  { id: 8, title: 'Foreign Status', component: ForeignStatus, conditional: true },
  { id: 9, title: 'Residence Verification', component: ResidenceVerification },
  { id: 10, title: 'Review & Declaration', component: ReviewDeclaration },
];

export function KYCWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKYCData] = useState<KYCData>({});

  const handleNext = (data: Partial<KYCData>) => {
    setKYCData({ ...kycData, ...data });
    
    // Skip conditional steps
    let nextStep = currentStep + 1;
    if (nextStep === 4 && !kycData.isMinor) nextStep = 5;
    if (nextStep === 8 && !kycData.isForeigner) nextStep = 9;
    
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    let prevStep = currentStep - 1;
    if (prevStep === 4 && !kycData.isMinor) prevStep = 3;
    if (prevStep === 8 && !kycData.isForeigner) prevStep = 7;
    
    setCurrentStep(Math.max(1, prevStep));
  };

  const currentStepData = steps.find(s => s.id === currentStep);
  const StepComponent = currentStepData?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Individual KYC Form</h1>
              <p className="text-sm text-gray-600">Nepal Rastra Bank Compliant</p>
            </div>
          </div>
          
          <StepProgress 
            steps={steps.filter(s => !s.conditional || (s.id === 4 && kycData.isMinor) || (s.id === 8 && kycData.isForeigner))} 
            currentStep={currentStep} 
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {StepComponent && (
          <StepComponent
            data={kycData}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === 10}
          />
        )}
      </div>
    </div>
  );
}
