"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Map, Table2 } from "lucide-react";
import pins from "@/data/pins.json";
import type { Pin } from "@/types/pin";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";

const IndiaMap = dynamic(() => import("@/components/IndiaMap"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
});

const companyColors = [
  { name: "Rajiv Plastics", color: "#3B82F6" },
  { name: "Emcure Pharmaceuticals", color: "#EF4444" },
  { name: "Akums Drugs & Pharmaceuticals", color: "#22C55E" },
  { name: "Mankind Pharma", color: "#F97316" },
  { name: "Asence Pharma", color: "#A855F7" },
];

export default function Home() {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "table">("map");

  const handlePinClick = (pin: Pin) => {
    setSelectedPin(pin);
    setSheetOpen(true);
  };

  return (
    <main className="h-screen w-full flex flex-col">
      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        <Button
          variant={viewMode === "map" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("map")}
        >
          <Map className="h-4 w-4 mr-2" />
          Map
        </Button>
        <Button
          variant={viewMode === "table" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("table")}
        >
          <Table2 className="h-4 w-4 mr-2" />
          Table
        </Button>
      </div>

      {viewMode === "map" ? (
        <>
          <IndiaMap pins={pins as Pin[]} onPinClick={handlePinClick} />
          <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
            <h3 className="text-sm font-semibold mb-2">Legend</h3>
            <div className="space-y-1">
              {companyColors.map((company) => (
                <div key={company.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: company.color }}
                  />
                  <span className="text-xs">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 p-6 pt-16 overflow-auto bg-background">
          <h1 className="text-2xl font-bold mb-4">Factory List</h1>
          <DataTable columns={columns} data={pins as Pin[]} />
        </div>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Factory Details</SheetTitle>
            <SheetDescription>
              View factory information
            </SheetDescription>
          </SheetHeader>
          {selectedPin && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Company Name
                </label>
                <p className="text-lg font-semibold">
                  {selectedPin.companyName || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Industry
                </label>
                <p className="text-lg font-semibold">
                  {selectedPin.industry || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Location
                </label>
                <p className="text-lg font-semibold">
                  {selectedPin.location || "N/A"}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}
