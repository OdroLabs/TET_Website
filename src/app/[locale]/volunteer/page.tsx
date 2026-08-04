import { HandHeart, Clock3, ShieldCheck, GraduationCap } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getLabels } from "@/lib/labels";
import { getSettings, s, sPairs } from "@/lib/settings";
import { PageHero } from "@/components/site/page-hero";
import { VolunteerForm } from "@/components/site/volunteer-form";
import { Card, CardContent } from "@/components/ui/card";

export default async function VolunteerPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const settings = await getSettings();
  const dict = getLabels(locale, settings);

  const opportunitiesTitle = s(settings, "volunteer_opportunities_title", locale);
  const opportunities = sPairs(settings, "volunteer_opportunities", locale);

  const formTitle = s(settings, "volunteer_form_title", locale);
  const formNote = s(settings, "volunteer_form_note", locale);
  const successMessage = s(settings, "volunteer_success_message", locale);

  const infoItems = [
    { icon: Clock3, label: "Time commitment", text: "As little as a few hours a month — we work around your schedule." },
    { icon: GraduationCap, label: "Training provided", text: "Every volunteer receives orientation and role-specific training before starting." },
    { icon: ShieldCheck, label: "Confidentiality agreement", text: "All volunteers agree to protect the privacy of the women we serve." },
  ];

  return (
    <>
      <PageHero
        title={s(settings, "volunteer_hero_title", locale)}
        intro={s(settings, "volunteer_hero_intro", locale)}
        image={s(settings, "volunteer_hero_image") || undefined}
      />

      <div className="container space-y-12 py-12 md:space-y-16 md:py-16">
        {opportunities.length > 0 && (
          <section id="sec-opportunities" data-animate>
            {opportunitiesTitle && (
              <div className="mb-5 flex items-center gap-2 text-primary">
                <HandHeart className="h-5 w-5" />
                <h2 className="text-xl font-bold">{opportunitiesTitle}</h2>
              </div>
            )}
            <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {opportunities.map((item, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <h3 className="font-bold text-navy-900">{item.left}</h3>
                  {item.right && (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.right}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="sec-form" className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {infoItems.map((item) => (
              <Card key={item.label}>
                <CardContent className="flex items-start gap-3 pt-5">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-3">
            {formTitle && <h2 className="mb-2 text-xl font-bold text-navy-900">{formTitle}</h2>}
            {formNote && (
              <p className="mb-4 whitespace-pre-line text-sm text-muted-foreground">{formNote}</p>
            )}
            <VolunteerForm dict={dict} successMessage={successMessage} />
          </div>
        </section>
      </div>
    </>
  );
}
