import type { Design, Order } from "../types/tshirt";

const API_URL = "http://localhost:3002";

export async function getDesigns(): Promise<Design[]> {
  const res = await fetch(`${API_URL}/designs`)

  if (!res.ok) {
    throw new Error("Ошибка загрузки");
  }

  return res.json();
}
export async function createOrder(newOrder: Omit<Order, "id">): Promise<Order> {
const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
       headers: { "Content-Type": "application/json"},
      body: JSON.stringify(newOrder)
    })
       if (!res.ok) {
       throw new Error("Ошибка создания");
  }

  return res.json()}

export async function createDesign(newDesign: Omit<Design, "id">): Promise<Design> {
  const res = await fetch(`${API_URL}/designs`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(newDesign)
  });

  if (!res.ok) {
    throw new Error("Ошибка создания");
  }

  return res.json();
};
export const updateDesign = async (id: number, updatedDesign: Design): Promise<Design> => {
  const res = await fetch(`${API_URL}/designs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDesign),
  });

  if (!res.ok) {
    throw new Error("Ошибка обновления");
  }

  return res.json();
};

export const deleteDesignApi = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/designs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Ошибка удаления");
  }
}
export async function uploadImage(file: File): Promise<{ imageUrl: string }> {
  const formData = new FormData()
  formData.append("image", file)

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error("Ошибка загрузки изображения")
  }

  return res.json()
}
type DesignCommandPayload = {
  command: string
  position: { x: number; y: number }
  size: number
  rotation: number
}

type DesignCommandResult = {
  position: { x: number; y: number }
  size: number
  rotation: number
}

export async function applyDesignCommandApi(
  payload: DesignCommandPayload
): Promise<DesignCommandResult> {
  const res = await fetch(`${API_URL}/design-command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Ошибка применения команды")
  }

  return res.json()
}
type PlacementResult = {
  position: { x: number; y: number }
  size: number
  rotation: number
}

export async function getAutoPlacementApi(): Promise<PlacementResult> {
  const res = await fetch(`${API_URL}/auto-placement`, {
    method: "POST",
  })

  if (!res.ok) {
    throw new Error("Ошибка auto placement")
  }

  return res.json()
}



