export type FormType =
  | "enquiry"
  | "anti-ragging"
  | "apply"
  | "scholarship"
  | "freeship"
  | "loan-assistance"
  | "advisor"
  | "international-office"
  | "student-clubs"
  | "campus-visit";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitForm(
  type: FormType,
  payload: object
): Promise<SubmitResult> {
  try {
    const res = await fetch(`/api/forms/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data?.error || `Request failed (${res.status})` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
