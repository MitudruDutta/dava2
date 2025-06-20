-- Drop existing objects if they exist, to allow for re-running the script.
DROP TABLE IF EXISTS public.medical_records_nfts, public.appointments, public.profiles;
-- Drop both old and new function signatures for clean re-runs
DROP FUNCTION IF EXISTS public.is_of_role(uuid, text);
DROP FUNCTION IF EXISTS public.is_of_role(uuid, public.user_role);

-- PROFILES Table
-- This table consolidates all user information, including role-specific details.
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at timestamptz DEFAULT now(),
  full_name text,
  avatar_url text,
  bio text,
  wallet_address text UNIQUE,
  role text NOT NULL DEFAULT 'patient',
  
  -- Patient-specific fields
  date_of_birth date,
  blood_group text,
  address text,
  contact_details text,
  emergency_contact_number text,

  -- Doctor-specific fields
  specialization text,
  consultation_fee numeric(10, 2),
  verified boolean DEFAULT false,

  CONSTRAINT wallet_address_length CHECK (wallet_address IS NULL OR char_length(wallet_address) >= 3)
);
COMMENT ON TABLE public.profiles IS 'Centralized table for all user profiles, including patients, doctors, and admins.';


-- Helper function to check user role
-- This function is used in table constraints to ensure data integrity.
CREATE OR REPLACE FUNCTION public.is_of_role(user_id uuid, required_role text)
RETURNS boolean AS $$
DECLARE
  user_role_result text;
BEGIN
  SELECT role INTO user_role_result FROM public.profiles WHERE id = user_id;
  RETURN user_role_result = required_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION public.is_of_role(uuid, text) IS 'Checks if a user has a specific role.';


-- APPOINTMENTS Table
-- Stores appointment details between patients and doctors.
CREATE TABLE public.appointments (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  appointment_date timestamptz,
  consultation_fee numeric(10, 2) NOT NULL,
  transaction_hash text UNIQUE,
  payment_status boolean NOT NULL DEFAULT false,

  CONSTRAINT patient_must_be_patient CHECK (public.is_of_role(patient_id, 'patient')),
  CONSTRAINT doctor_must_be_doctor CHECK (public.is_of_role(doctor_id, 'doctor'))
);
COMMENT ON TABLE public.appointments IS 'Schedules appointments and tracks payment status.';
CREATE INDEX ON public.appointments (patient_id);
CREATE INDEX ON public.appointments (doctor_id);


-- MEDICAL_RECORDS_NFTS Table
-- Stores information about NFTs minted from medical records.
CREATE TABLE public.medical_records_nfts (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  patient_wallet_address text NOT NULL,
  doctor_wallet_address text NOT NULL,
  diagnosis text,
  treatment text,
  token_uri text NOT NULL
);
COMMENT ON TABLE public.medical_records_nfts IS 'Tracks NFTs created from medical records for patient ownership.';
CREATE INDEX ON public.medical_records_nfts (appointment_id);
CREATE INDEX ON public.medical_records_nfts (patient_wallet_address); 