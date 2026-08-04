import { Building2, Wallet } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getLabels } from "@/lib/labels";
import { getSettings, s } from "@/lib/settings";
import { PageHero } from "@/components/site/page-hero";
import { HallBookingForm } from "@/components/site/hall-booking-form";

export default async function HallBookingPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const settings = await getSettings();
  const dict = getLabels(locale, settings);

  const detailsTitle = s(settings, "hall_details_title", locale);
  const detailsText = s(settings, "hall_details_text", locale);
  const rates = s(settings, "hall_rates");
  const images = [
    s(settings, "hall_image1"),
    s(settings, "hall_image2"),
    s(settings, "hall_image3"),
  ].filter(Boolean);

  const formTitle = s(settings, "hall_form_title", locale);
  const formNote = s(settings, "hall_form_note", locale);
  const successMessage = s(settings, "hall_success_message", locale);

  const showDetails = Boolean(detailsText || rates || images.length > 0);

  return (
    <>
      <PageHero
        title={s(settings, "hall_hero_title", locale)}
        intro={s(settings, "hall_hero_intro", locale)}
        image={s(settings, "hall_hero_image") || undefined}
      />

      <div
        className={`container grid items-start gap-10 py-12 md:py-16 ${
          showDetails ? "lg:grid-cols-[1.1fr_0.9fr]" : "max-w-2xl"
        }`}
      >
        <div id="sec-form">
          {formTitle && <h2 className="mb-2 text-xl font-bold text-navy-900">{formTitle}</h2>}
          {formNote && (
            <p className="mb-4 whitespace-pre-line text-sm text-muted-foreground">{formNote}</p>
          )}
          <HallBookingForm dict={dict} successMessage={successMessage} />
        </div>

        {showDetails && (
          <div id="sec-details" className="space-y-6">
            {images.length > 0 && (
              <div className={`grid gap-3 ${images.length > 1 ? "grid-cols-2" : ""}`}>
                {images.map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className={`aspect-[4/3] w-full rounded-2xl object-cover shadow-card ${
                      images.length === 1 ? "aspect-[16/9]" : ""
                    }`}
                  />
                ))}
              </div>
            )}

            {(detailsTitle || detailsText) && (
              <div className="rounded-3xl border border-border bg-white p-7 shadow-card">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-primary ring-1 ring-brand-100">
                    <Building2 className="h-5 w-5" />
                  </span>
                  {detailsTitle && <h3 className="font-extrabold text-navy-900">{detailsTitle}</h3>}
                </div>
                {detailsText && (
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {detailsText}
                  </p>
                )}
              </div>
            )}

            {rates && (
              <div className="rounded-3xl border border-border bg-white p-7 shadow-card">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-primary ring-1 ring-brand-100">
                    <Wallet className="h-5 w-5" />
                  </span>
                  <h3 className="font-extrabold text-navy-900">Rates</h3>
                </div>
                <pre className="whitespace-pre-wrap rounded-2xl bg-muted p-5 font-sans text-sm leading-relaxed text-navy-900">
                  {rates}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
