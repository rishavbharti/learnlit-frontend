export const isBrowser = () => typeof window !== 'undefined';

export const getInitials = (name) =>
  name
    .split(' ')
    .map((name) => name[0])
    .join('');

export const getCourseDuration = (duration) => {
  if (duration) {
    const durationArray = duration.split(':');
    const hours = durationArray[0];
    const mins = durationArray[1];

    if (hours) {
      return `${hours} hours+`;
    }

    if (mins) {
      return `${mins} minutes`;
    }
  }

  return null;
};

export const getChapterDuration = (duration) => {
  if (duration) {
    const durationArray = duration.split(':');
    const hours = durationArray[0];
    const mins = durationArray[1];

    if (hours !== '00') {
      return `${hours}hr ${mins}min`;
    }

    if (mins) {
      return `${mins}min`;
    }
  }

  return null;
};

export const scrollElementIntoView = (id) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
};

export const getInstructors = (course) =>
  course?.instructors?.map((i) => i.name).join(', ');

export const getCoursePrice = (course) =>
  course?.pricing === 'Free' ? 'Free' : `${course.currency} ${course.price}`;
