import { supabase } from "../lib/supabase.js";

export async function createSubmission(resume) {
  const payload = {
    full_name: resume.personal?.fullName || "",
    target_role: resume.personal?.targetRole || "",
    email: resume.personal?.email || "",
    profile_image: resume.profileImage || "",
    resume_data: resume,
  };

  const { data, error } = await supabase
    .from("resume_submissions")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getSubmissions() {
  const { data, error } = await supabase
    .from("resume_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateSubmission(id, resume) {
  const payload = {
    full_name: resume.personal?.fullName || "",
    target_role: resume.personal?.targetRole || "",
    email: resume.personal?.email || "",
    profile_image: resume.profileImage || "",
    resume_data: {
      ...resume,
      updatedAt: new Date().toISOString(),
    },
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("resume_submissions")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSubmission(id) {
  const { error } = await supabase
    .from("resume_submissions")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}