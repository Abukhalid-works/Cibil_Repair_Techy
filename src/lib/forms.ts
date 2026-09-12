export async function submitToFormspree(
  endpoint: string | undefined,
  data: Record<string, unknown>
): Promise<{ success: boolean; message?: string }> {
  if (!endpoint) {
    console.error("Formspree endpoint is missing in environment variables.");
    return {
      success: false,
      message: "Form endpoint is not configured. Please contact 9346437039 directly.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Formspree error response:", errorData);
      return {
        success: false,
        message: "Something went wrong. Please try again or contact us directly at 9346437039.",
      };
    }
  } catch (err) {
    console.error("Form submission network error:", err);
    return {
      success: false,
      message: "Network error occurred. Please check your connection and try again or call 9346437039.",
    };
  }
}
