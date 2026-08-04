"use client";

import { useState } from "react";
import { submitVolunteerApplication } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";

export function VolunteerForm({
  dict,
  /** Set in Site Settings → Volunteer Page. Falls back to a generic thank-you. */
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
        const res = await submitVolunteerApplication(fd);
        if (res.ok) setDone(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="v-name">{dict.common.name} *</Label>
          <Input id="v-name" name="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="v-email">{dict.common.email} *</Label>
          <Input id="v-email" name="email" type="email" required />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="v-phone">
            {dict.common.phone} <span className="text-muted-foreground">({dict.common.optional})</span>
          </Label>
          <Input id="v-phone" name="phone" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="v-interest">
            Area of interest <span className="text-muted-foreground">({dict.common.optional})</span>
          </Label>
          <Input id="v-interest" name="interestArea" placeholder="e.g. Outreach, Peer Support" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="v-availability">
          Availability <span className="text-muted-foreground">({dict.common.optional})</span>
        </Label>
        <Input id="v-availability" name="availability" placeholder="e.g. Weekday evenings" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="v-message">
          Why do you want to volunteer? <span className="text-muted-foreground">({dict.common.optional})</span>
        </Label>
        <Textarea id="v-message" name="message" rows={5} />
      </div>
      <Button type="submit">{dict.common.send}</Button>
    </form>
  );
}
