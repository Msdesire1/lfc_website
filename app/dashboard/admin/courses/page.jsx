"use client";

/**
 * Course management, from GET /api/admin/courses.
 *
 * This endpoint returns unpublished courses too — the students' /courses route
 * hides them — which is the whole point of an admin list: you cannot publish
 * something you cannot see.
 *
 * Publishing is the one action wired here. Creating courses and uploading lessons
 * have endpoints (POST /admin/courses, POST /admin/courses/:code/lessons) but no
 * screen yet; the placeholder cards below are HP's sketch of where they go.
 */

import Link from "next/link";
import { ArrowLeft, Video, BookOpen, ClipboardList, Users } from "lucide-react";
import { admin } from "@/lib/api";
import { messageOf, useAction, useApi } from "@/lib/useApi";
import { ErrorNote, Loading } from "@/components/dashboard/Async";
import { useState } from "react";

export default function AdminCoursesPage() {
  const list = useApi(() => admin.courses.list(), { as: "admin" });
  const publish = useAction((code, published) => admin.courses.update(code, { published }), {
    as: "admin",
  });
  const [notice, setNotice] = useState("");

  const courses = list.data?.courses || [];

  const togglePublished = async (course) => {
    setNotice("");
    const { ok, error } = await publish.run(course.code, !course.published);
    if (!ok) {
      setNotice(messageOf(error));
      return;
    }
    list.reload();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Course management</p>
            <h1 className="mt-3 text-3xl font-bold">Courses</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-500">
              Publish courses, assign lecturers, upload resources, and manage course status.
            </p>
          </div>
          <Link
            href="/dashboard/admin"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft size={16} /> Back to admin dashboard
          </Link>
        </div>
      </section>

      {list.loading && <Loading label="Loading courses…" />}
      {!list.loading && list.error && <ErrorNote error={list.error} onRetry={list.reload} />}

      {!list.loading && !list.error && (
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Programmes</h2>
              <p className="mt-1 text-sm text-slate-500">
                Unpublished courses are hidden from students until you publish them.
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              {courses.length} course{courses.length === 1 ? "" : "s"}
            </span>
          </div>

          {notice && (
            <p className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{notice}</p>
          )}

          {courses.length === 0 && (
            <p className="mt-6 text-sm text-slate-500">
              No courses have been created yet. Run the backend&apos;s seed script, or add them through
              POST /api/admin/courses.
            </p>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article key={course.code} className="flex flex-col rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">{course.code}</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{course.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{course.period}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      course.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {course.published ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm text-slate-600">{course.description}</p>

                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-white p-3">
                    <dt className="flex items-center gap-2 text-xs text-slate-400">
                      <BookOpen size={14} /> Lessons
                    </dt>
                    <dd className="mt-1 font-bold text-slate-900">{course.lessonCount}</dd>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <dt className="flex items-center gap-2 text-xs text-slate-400">
                      <Users size={14} /> Students
                    </dt>
                    <dd className="mt-1 font-bold text-slate-900">{course.activeStudents}</dd>
                  </div>
                </dl>

                {course.lecturer && (
                  <p className="mt-4 text-xs text-slate-500">
                    {course.lecturerTitle ? `${course.lecturerTitle} ` : ""}
                    {course.lecturer}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => togglePublished(course)}
                  disabled={publish.busy}
                  className="mt-5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {course.published ? "Unpublish" : "Publish"}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Create course", BookOpen, "Add course titles, modules, and summaries."],
          ["Content", Video, "Upload videos, notes, quizzes, and resources."],
          ["Publish", ClipboardList, "Manage publish state and visibility."],
        ].map(([title, Icon, description]) => (
          <article key={title} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-700">
              <Icon size={20} />
              <p className="font-semibold">{title}</p>
            </div>
            <p className="mt-4 text-sm text-slate-600">{description}</p>
          </article>
        ))}
      </section> */}
    </div>
  );
}
