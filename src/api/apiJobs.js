import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, company:companies(name, logo_URL), saved:saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.log("Error fetching Jobs:", error);
    return null;
  }
  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);
  if (alreadySaved) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (error) {
      console.log("Error Deleting Saved Jobs:", error);
      return null;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (error) {
      console.log("Error Saving Jobs:", error);
      return null;
    }
    return data;
  }
}
