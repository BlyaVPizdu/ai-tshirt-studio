import type { Design } from "../types/tshirt";

const API_URL = "http://localhost:3001/designs";

export async function getDesigns(): Promise<Design[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Ошибка загрузки");
  }

  return res.json();
};

export async function createDesign(newDesign: Omit<Design, "id">): Promise<Design> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(newDesign)
  });

  if (!res.ok) {
    throw new Error("Ошибка создания");
  }

  return res.json();
};


export const deleteDesignApi = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Ошибка удаления");
  }
};
export const sendPrompt = async (prompt: string)=>{
        const text = prompt.toLowerCase().split(" ")
      const res = await fetch("http://localhost:3002/generate", {
           method: "POST",
          headers: { "Content-Type": "application/json"},
           body: JSON.stringify(text)
  })
  return res.json()
}
