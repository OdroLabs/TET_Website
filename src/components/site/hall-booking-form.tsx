"use client";

import { useState } from "react";
import { submitHallBooking } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";

export function HallBookingForm({
  dict,
  /** Set in Site Settings → Hall Booking Page. Falls back to a generic thank-you. */
  successMessage,
}: {
  dict: Dictionary;
  successMessage?: string;
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-lg border border-teal-500/40 bg-teal-50 p-6 text-teal-800">
        ✓ {successMessage || dict.common.thankYou}
      </div>
    );
  }

  return (
    <form
      action={async (fd) => {
        const res = await submitHallBooking(fd);
        if (res.ok) setDone(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="h-name">{dict.common.name} *</Label>
          <Input id="h-name" name="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="h-phone">{dict.common.phone} *</Label>
          <Input id="h-phone" name="phone" required />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="h-org">
            Organisation <span className="text-muted-foreground">({dict.common.optional})</span>
          </Label>
          <Input id="h-org" name="organization" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="h-email">
            {dict.common.email} <span className="text-muted-foreground">({dict.common.optional})</span>
          </Label>
          <Input id="h-email" name="email" type="email" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="h-date">
            Preferred date <span className="text-muted-foreground">({dict.common.optional})</span>
          </Label>
          <Input id="h-date" name="eventDate" type="date" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="h-purpose">
            Purpose <span className="text-muted-foreground">({dict.common.optional})</span>
          </Label>
          <Input id="h-purpose" name="purpose" placeholder="e.g. Community meeting" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="h-message">
          {dict.common.message} <span className="text-muted-foreground">({dict.common.optional})</span>
        </Label>
        <Textarea id="h-message" name="message" rows={5} />
      </div>
      <Button type="submit">{dict.common.send}</Button>
    </form>
  );
}
