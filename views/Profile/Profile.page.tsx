import React, { useRef, Suspense } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Camera, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import {
  useUserCustomerDetails,
  useUserUpdateDetails,
  useUserUploadAvatar,
  useUserDeleteAvatar,
  getKycVerificationStatusFromUser,
} from '@/api/user'
import { UpdateUserDetailsData } from '@/client/index.ts'
import { useUserActions, useIsKycModalOpen } from '@/stores/userStore'
import KYCModal from '@/components/features/onboarding/KYCModal'
import RegionSelect from '@/components/ui/region-dropdown'
import CountryDropdown, { Country } from '@/components/ui/country-dropdown'
import countries3To2 from 'i18n-iso-countries'

interface ProfileFormData {
  name: string
  entityName: string
  jurisdiction: string
  registrationId: string
  countryOfResidence: string
}

const convertCountryCode = (alpha3Code: string): string => {
  try {
    return countries3To2.alpha3ToAlpha2(alpha3Code) || alpha3Code
  } catch (error) {
    console.error('Error converting country code:', error)
    return alpha3Code
  }
}

const EditableName: React.FC<{
  name?: string;
  updateProfile: any;
}> = ({ name, updateProfile }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(name || '');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setEditedName(name || '');
  }, [name]);

  React.useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleSave = async () => {
    if (editedName.trim() && editedName !== name) {
      await updateProfile.mutateAsync({ body: { name: editedName.trim() } });
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditedName(name || '');
      setIsEditing(false);
    }
  };
  const handleBlur = () => handleSave();

  return isEditing ? (
    <input
      ref={inputRef}
      value={editedName}
      onChange={e => setEditedName(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className="text-3xl font-bold text-[#1a1a1a] text-center mt-6 border-b border-gray-200 w-full focus:outline-none focus:border-primary bg-transparent"
      style={{ minHeight: 48 }}
      maxLength={64}
    />
  ) : (
    <div
      className="text-3xl font-bold text-[#1a1a1a] text-center mt-6 cursor-pointer border-b border-gray-200 w-full hover:opacity-80"
      style={{ minHeight: 48 }}
      onClick={() => setIsEditing(true)}
      tabIndex={0}
      role="button"
      aria-label="Edit name"
    >
      {name || 'Not provided'}
    </div>
  );
};

const BusinessFields: React.FC<{
  customer: any;
  updateProfile: any;
  convertCountryCode: (code: string) => string;
  watch: any;
  setValue: any;
  control: any;
}> = ({ customer, updateProfile, convertCountryCode, watch, setValue, control }) => {
  const [fields, setFields] = React.useState({
    entityName: customer?.entityName || '',
    jurisdiction: customer?.jurisdiction || '',
    registrationId: customer?.registrationId || '',
    countryOfResidence: customer?.countryOfResidence || 'USA',
  });

  React.useEffect(() => {
    setFields({
      entityName: customer?.entityName || '',
      jurisdiction: customer?.jurisdiction || '',
      registrationId: customer?.registrationId || '',
      countryOfResidence: customer?.countryOfResidence || 'USA',
    });
  }, [customer]);

  const handleFieldChange = (field: string, value: string) => {
    setFields(f => ({ ...f, [field]: value }));
  };
  const handleFieldBlur = async (field: string) => {
    if (fields[field] !== customer?.[field]) {
      await updateProfile.mutateAsync({ body: { [field]: fields[field] } });
    }
  };
  return (
    <div className="w-full flex flex-col gap-2 mt-6">
      <div className="mb-2">
        <label className="text-base font-semibold text-[#1a1a1a] mb-1 block">Country of Residence</label>
        <CountryDropdown
          onChange={(country: any) => {
            handleFieldChange('countryOfResidence', country.alpha3);
            setValue('jurisdiction', '');
          }}
          defaultValue={fields.countryOfResidence}
          className="w-full"
          placeholder="Select a country..."
        />
      </div>
      <div className="mb-2">
        <label className="text-base font-semibold text-[#1a1a1a] mb-1 block">Entity Name</label>
        <input
          value={fields.entityName}
          onChange={e => handleFieldChange('entityName', e.target.value)}
          onBlur={() => handleFieldBlur('entityName')}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
          placeholder="Business/Entity Name"
        />
      </div>
      <div className="mb-2">
        <label className="text-base font-semibold text-[#1a1a1a] mb-1 block">Jurisdiction</label>
        <RegionSelect
          countryCode={convertCountryCode(fields.countryOfResidence || '')}
          onChange={value => handleFieldChange('jurisdiction', value)}
          className="w-full"
          disabled={!fields.countryOfResidence}
          value={fields.jurisdiction}
          textPlaceholder={'Enter your jurisdiction'}
          placeholder="Select jurisdiction..."
          onBlur={() => handleFieldBlur('jurisdiction')}
        />
      </div>
      <div className="mb-2">
        <label className="text-base font-semibold text-[#1a1a1a] mb-1 block">Registration ID</label>
        <input
          value={fields.registrationId}
          onChange={e => handleFieldChange('registrationId', e.target.value)}
          onBlur={() => handleFieldBlur('registrationId')}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
          placeholder="Registration ID"
        />
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const { data: customer, isLoading: isCustomerLoading, error: customerError } = useUserCustomerDetails()
  const updateProfile = useUserUpdateDetails()
  const uploadAvatar = useUserUploadAvatar()
  const deleteAvatar = useUserDeleteAvatar()
  const { setKycModalOpen } = useUserActions()
  const isKycModalOpen = useIsKycModalOpen()
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const userEmail = customer?.email
  const userName = customer?.name
  const kycData = customer?.bridgeKyc
  const userAvatar = customer?.avatar
  const kycVerificationStatus = getKycVerificationStatusFromUser(customer)

  const isLoading = isCustomerLoading || !customer

  const getKYCStatus = () => {
    if (kycData?.kyc_status === 'approved') return 'completed'
    if (kycData?.kyc_status === 'pending') return 'pending'
    return 'incomplete'
  }

  const kycStatus = getKYCStatus()

  const getKYCType = () => {
    if (!kycData?.type) return 'Individual'
    return kycData.type === 'business' ? 'Business' : 'Individual'
  }

  const isBusinessAccount = getKYCType() === 'Business'
  const defaultCountryCode = 'USA'

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: userName || '',
      entityName: customer?.entityName || '',
      jurisdiction: customer?.jurisdiction || '',
      registrationId: customer?.registrationId || '',
      countryOfResidence: customer?.countryOfResidence || defaultCountryCode,
    },
  })

  React.useEffect(() => {
    reset({
      name: userName || '',
      entityName: customer?.entityName || '',
      jurisdiction: customer?.jurisdiction || '',
      registrationId: customer?.registrationId || '',
      countryOfResidence: customer?.countryOfResidence || defaultCountryCode,
    })
  }, [userName, customer, reset, defaultCountryCode])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
  }

  const handleCompleteKYC = () => {
    setKycModalOpen(true)
  }

  const handleAvatarClick = () => {
    // Always open file picker - deletion will happen automatically if needed
    avatarInputRef.current?.click()
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    try {
      // If user already has an avatar, delete it first
      if (userAvatar) {
        console.log('Existing avatar found, deleting before upload...')
        await deleteAvatar.mutateAsync()
      }

      // Then upload the new avatar using file upload
      await uploadAvatar.mutateAsync(file)
    } catch (error) {
      console.error('Failed to upload avatar:', error)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    const payload: UpdateUserDetailsData['body'] = { name: data.name }

    if (isBusinessAccount) {
      payload.entityName = data.entityName
      payload.jurisdiction = data.jurisdiction
      payload.registrationId = data.registrationId
      payload.countryOfResidence = data.countryOfResidence
    }

    try {
      await updateProfile.mutateAsync({
        body: payload,
      } as UpdateUserDetailsData)
      // Don't reset the form here - let React Query cache update handle it
      // The useEffect will automatically reset the form with fresh server data
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleCancel = () => {
    reset()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-start min-h-screen p-6 bg-[#f5f7fa]">
        <div className="bg-white rounded-2xl p-8 w-full max-w-[450px] flex flex-col items-center shadow-md">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (customerError) {
    return (
      <div className="flex justify-center items-start min-h-screen p-6 bg-[#f5f7fa]">
        <div className="bg-white rounded-2xl p-8 w-full max-w-[450px] flex flex-col items-center shadow-md">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <p className="mt-4 text-red-600">Failed to load profile data</p>
        </div>
      </div>
    )
  }

  console.log(convertCountryCode(watch('countryOfResidence')), 'Country', watch('jurisdiction'))

  return (
    <div className="flex justify-center items-start p-0 bg-[#f5f7fa]">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[450px] flex flex-col items-center shadow-md">


        {/* Avatar and camera overlay */}
        <div className="flex flex-col items-center w-full">
          <div className="relative inline-block mt-6">
            <div
              className="w-[100px] h-[100px] rounded-full bg-primary text-white flex items-center justify-center text-2xl overflow-hidden border border-gray-200 select-none"
              style={userAvatar ? { backgroundImage: `url(${userAvatar})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {!userAvatar && (userName ? getInitials(userName) : '?')}
            </div>
            <Button
              variant="default"
              size="icon"
              className="absolute bottom-0 right-0 bg-black/50 hover:bg-black/70 p-1.5 rounded-full"
              onClick={handleAvatarClick}
              disabled={uploadAvatar.isPending || deleteAvatar.isPending}
              type="button"
            >
              {uploadAvatar.isPending || deleteAvatar.isPending ? (
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              ) : (
                <Camera className="h-5 w-5 text-white" />
              )}
            </Button>
            <input ref={avatarInputRef} type="file" className="hidden" accept="image/png,image/jpeg" onChange={handleAvatarChange} />
          </div>

          {/* KYC Type Pill */}
          <div className="mt-8 text-[#007aff] text-base font-semibold border border-[#E0E0E0] bg-[#f5f7fa] py-1 px-4 rounded-xl">
            {getKYCType()}
          </div>

          {/* Editable Name */}
          <EditableName
            name={userName}
            updateProfile={updateProfile}
          />

          {/* Email */}
          <div className="text-gray-600 text-sm mt-6">{userEmail || 'Not provided'}</div>

          {/* Business fields (auto-save on blur) */}
          {isBusinessAccount && (
            <BusinessFields
              customer={customer}
              updateProfile={updateProfile}
              convertCountryCode={convertCountryCode}
              watch={watch}
              setValue={setValue}
              control={control}
            />
          )}

          {/* KYC Status Row */}
          <div className="flex gap-4 items-center my-8">
            {kycStatus === 'incomplete' && (
              <>
                <div className="px-4 py-2 text-base border-2 border-amber-500 rounded-full font-medium bg-amber-50 text-amber-500 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  KYC Incomplete
                </div>
                <Button onClick={handleCompleteKYC}>Complete KYC</Button>
              </>
            )}
            {kycStatus === 'pending' && (
              <div className="px-4 py-2 text-base border-2 border-yellow-400 rounded-full font-medium bg-yellow-50 text-yellow-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                KYC Pending
              </div>
            )}
            {kycStatus === 'completed' && (
              <div className="px-4 py-2 text-base border-2 border-green-500 rounded-full font-medium bg-green-50 text-green-500 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                KYC Verified
              </div>
            )}
          </div>
        </div>
      </div>

      <KYCModal isOpen={isKycModalOpen} onClose={() => setKycModalOpen(false)} kycVerificationStatus={kycVerificationStatus} />
    </div>
  )
}

export default ProfilePage
